# Data analysis

To be useful, network measurement data must be analyzed. This section of the
magma guide provides an overview of how to conduct data analyses on network
measurements.

Currently this section includes information on network measurements gathered by
OONI-developed software.

## OONI data analysis

### Tools for OONI data analysis

Analysis of OONI data requires the use of several tools, all of which can be
downloaded easily. After downloading, users should read and familiarize
themselves with each tool prior to commencing data analysis.

#### [jq](https://stedolan.github.io/jq/)

A lightweight and flexible command-line JSON processor. For our purposes, `jq`
will be used to generate `CSV` files from OONI data. The complete documentation
of `jq` can be found [here](https://stedolan.github.io/jq/manual/).

#### [R](https://cran.r-project.org/)

A software environment for statistical computing and graphics. For our purposes,
we will use `Rscript` (the scripting front-end for R) to be able to run R
scripts from the command line and generate data plots out of OONI data.
Documentation resources and manuals for `R` can be found
[here](https://cran.r-project.org/manuals.html).

#### [ooni-sync](https://www.bamsoftware.com/software/ooni-sync/)

A fast downloader of OONI reports using the OONI API, `ooni-sync` works by
downloading an index of available files (only downloading the files that are not
already present locally). Users can run it again and again to ensure their local
directory is up-to-date with newly published reports.

The following `ooni-sync` command will:

1. Create the directory "reports" if one does not already exist
2. Download all `tcp_connect` reports that are not already present in the
   directory
3. Compress the downloaded reports with the `xz` data compression tool

`ooni-sync -xz -directory reports test_name=tcp_connect`

More information on `ooni-sync` queries, test name values, and parameters is
available [here](https://www.bamsoftware.com/software/ooni-sync/). More
documentation on the API is available [here](https://api.ooni.io/api/).

#### [ooni-sync in Docker](https://github.com/anadahz/ooni-sync-docker#ooni-sync-in-docker)

If you do not want to install all the programs and tools required to analyze
OONI data, you can instead use `ooni-sync in Docker` (a Docker image with all
required dependencies ready to use `ooni-sync`, `jq`, and `R`). Instructions for
how to use the Docker image, as well as installation instructions, can be found
[here](https://github.com/anadahz/ooni-sync-docker#ooni-sync-in-docker).

### OONI data location

When performing an analysis across an OONI data set, it is often beneficial to
use a local copy of the data you have gathered. OONI provides a full copy of the
data that can be downloaded from an Amazon S3 Bucket, or accessed directly from
a VM spun up within the Amazon cloud. Access and directions on how to get access
to the raw data can be found
[on the OONI website](https://ooni.io/post/mining-ooni-data/).

Depending on disk constraints, certain users may prefer to locally keep only a
compressed copy of the data, and stream their analysis (ensuring that only the
working set is compressed as it is processed). Tools like
[oonimap](https://github.com/willscott/oonimap) can help automate this process.

## Case study: Tanzania

The following case study using Tanzania data illustrates the data analysis tools
and techniques discussed in section [Getting started](getting-started.md). First
time users should follow along and complete this analysis before attempting to
complete an analysis of their own data. By following the step-by-step
procedures, and viewing the screen grabs below, first time researchers will be
able to learn the basics of OONI data analysis.

<!-- prettier-ignore -->
::: warning
Note: Prior to starting this sample analysis, please ensure you have sufficient
available storage capacity (OONI reports can occupy a significant amount of
storage space, ranging from hundreds of Megabytes of data to several Gigabytes).
:::

In order to proceed with the data analysis, you must first install all the
required tools listed above in section
[Tools to analyze OONI data repository](data-analysis.md#tools-for-ooni-data-analysis)
(`jq`, `R`, `ooni-sync`), or be prepared to use the
[ooni-sync in Docker](data-analysis.md#ooni-sync-in-docker) implementation.

### Step One: Download OONI data from Tanzania

Begin your analysis by downloading all OONI country-specific reports using
[ooni-sync](#ooni-sync).

This is the `ooni-sync` command to download all OONI reports ever collected from
Tanzania (country code `TZ`):

```
ooni-sync -xz -directory tz-ooni-reports probe_cc=tz since=01-01-2012 limit=1000000
```

After running the above command, you should see something similar to this at
your shell output:

```sh
828/857 ok: tz-ooni-reports/20181218T121034Z-TZ-AS37454-ndt-20181218T121042Z_AS37454_VU9vP1oCcOuB5M04f6tR4RYUmIiJpxGQB2IkMfAy5HiralpMCD-0.2.0-probe.json.xz
829/857 ok: tz-ooni-reports/20181231T144647Z-TZ-AS327885-ndt-20181231T144657Z_AS327885_ufZGRAnBdudgh0X5Vt5EVdE5n4PEmVjFjZ6t4UycXzI4EgUT9Y-0.2.0-probe.json.xz
830/857 ok: tz-ooni-reports/20190101T125100Z-TZ-AS37133-whatsapp-20190101T125106Z_AS37133_yjhXu9xBgVaEPgB2OQS7l8oqLpNwCNjyYgwgiLtBkE7XOd66K7-0.2.0-probe.json.xz
831/857 ok: tz-ooni-reports/20190101T125120Z-TZ-AS37133-telegram-20190101T125127Z_AS37133_J8myeccAwIDF0NjY47Ixhlr03ojgyDGkF80X1l3ZrRdjQg5WdM-0.2.0-probe.json.xz
832/857 ok: tz-ooni-reports/20190101T125044Z-TZ-AS37133-http_header_field_manipulation-20190101T125049Z_AS37133_K4NutKeGRUl6wbtPvfxkkMgjAmDOYIFNr00AD2ubuGvlGNcHeK-0.2.0-probe.json.xz
833/857 ok: tz-ooni-reports/20190104T211332Z-TZ-AS327885-ndt-20190104T211341Z_AS327885_yL5dgUq4u7r7OfGTzu5qh3PQ1vMIbXSfjZAAj9Sgckajc79LiF-0.2.0-probe.json.xz
834/857 ok: tz-ooni-reports/20190104T211347Z-TZ-AS327885-ndt-20190104T211354Z_AS327885_SA5UGGReW8Nj9Dj91QPuKF478F6iLnNXt2RFDNGchJQLRjy9yn-0.2.0-probe.json.xz
```

### Step Two: Analyze Web Connectivity OONI reports

Now, on the same directory as the one used to download the OONI reports, the
following procedures will be run to extract a `CSV` file from all downloaded
data per test.

A high level description of the Web Connectivity test can be found under
[OONI - Web Connectivity test](https://ooni.torproject.org/nettest/web-connectivity/).
The complete and detailed specifications of Web Connectivity test can be found
under
[OONI Specifications - Web Connectivity test](https://github.com/ooni/spec/blob/master/nettests/ts-017-web-connectivity.md).

To simplify the analysis, create a file and instruct `jq` to use the filter from
this file. To do so, simply copy the content listed below into a file named
`makecsv.jq` (you can ignore the lines starting with `#` used as comments to
understand what the `jq` filter does):

```jq
select(.input)
# Set $blocking_type if .test_keys.blocking is not false, but only if
# .test_keys.http_experiment_failure doesn't contain "unknown_failure"
# (which indicates a measurement error and not blocking).
# Git commit: https://github.com/TheTorProject/ooni-probe/commit/d2ace6fc566daec6c4b9549b5f89830929d2d908
  | (.test_keys.blocking and (.test_keys.http_experiment_failure | tostring | contains("unknown_failure") | not)) as $blocking
# Extract an array of columns we want.
  | [.measurement_start_time, .report_id, .probe_cc, .probe_asn, .input, $blocking, .test_keys.blocking // ""]
# Make CSV.
  | @csv, "\n"
```

The following commands will generate a `CSV` file generated from all downloaded
OONI reports of the Web Connectivity test (note: this may take some time, but
you will be able to see the progress of the task):

```sh
(echo date,report_id,country,asn,url,blocked,blocking_type; xz -dc *web_connectivity*.json.xz | jq -j -f makecsv.jq --unbuffered) | tee web_connectivity_tz.csv
```

Once the task is complete, you should be able to find a file of the generated
CSV under the name `web_connectivity_tz.csv`.

The file should have the following `CSV` header:
`date,report_id,country,asn,url,blocked,blocking_type`

#### CSV header explanation

- The `date` field stands for `measurement_start_time`: Timestamp of when the
  measurement was performed in UTC time coordinates (ex. 2015-08-24 12:02:23)
- `report_id`: Is the unique report identifier
- `country`: The two-letter country code of the probe as defined in ISO3166-1
  alpha-2 (ex. `IT` for Italy) or `ZZ` when the country is undefined
- `asn`: The autonomous system number of the network the test is related to
  prefixed by "AS" (ex. "AS1234")
- `url` or `endpoint`: The input entry usually a URL, hostname or IP address
- `blocked`: A boolean string `true` or `false` defines if the specific
  measurement has been found to be blocked
- `blocking_type`: Is used to identify the reason for blocking. This can be one
  of the following `dns`, `tcp_ip` or `http`.
- `connection`: Used by the TCP Connect test. If the connection is successful,
  the field is set as 'success', if the connection fails then the reason for the
  failure is listed in the field.

#### Web Connectivity test: Blocking types

The Web Connectivity test uses the OONI report key `blocking` to identify the
reason for blocking upon the completion of the test. The `blocking` type can be
one of the following: "tcp_ip", "dns", or "http".

Be aware that the blocking types can be set to `dns` if the DNS query answers
are inconsistent and if when performing the HTTP request the expected page is
not generated
`((headers_match == false and body_length_match == false) or status_code_match == false)`.
Additionally, `dns` will be the reason for blocking when a failure of type
`dns_lookup_error` is returned while attempting to perform the HTTP request.

Blocking types will be set to `tcp_ip` when the DNS query answers are consistent
but no connection was made to the `IP:PORT` combinations that were resolved in
the experiment, even though the control succeeded. In such a situation, the HTTP
request must have failed.

Finally, blocking types will be set to `http` when DNS resolutions are
consistent and a TCP connection to the IP ports of the control was established,
but the HTTP request either failed or an HTTP response was returned that
contained an unexpected page.

The flag "blocking" is set to null if "accessible" is true, otherwise it
indicates the reason for blocking: either inconsistent DNS responses (`dns`),
TCP/IP based blocking (`tcp_ip`), the HTTP page response matches with the
control (http-diff), or the HTTP response failed (`http-failure`).

An extended section detailing the reasons for blocking can be found here:
[Web Connectivity test specification](https://github.com/ooni/spec/blob/master/nettests/ts-017-web-connectivity.md).

### Step Three: Formatting URLs in CSV file

<!-- prettier-ignore -->
::: tip
Note: When dealing with a number of OONI reports, you may encounter several URLs
that refer to the same domain name or website. Data analysis can be simplified
by formatting these URLs to only get their subdomain (excluding the common `www`
prefix) and domain name.
:::

Use the following GNU `sed` command to format the URLs in the CSV file
(`web_connectivity_tz.csv`) and strip anything else away from the domains and
subdomains of the URLs (excluding the common `www` subdomain):

```sh
sed -i 's/[^,"/]*\/\/\([^@]*@\)\?\([^:/]*\)[^,"]*/\2/ ; s,www\.,,'  web_connectivity_tz.csv
```

### Step Four: Plotting the data with R

Now it is time to use R to plot the data in the `CSV` file
(`web_connectivity_tz.csv`).

To do so, copy the following contents into a file (`webct.R`):

```R
library(ggplot2)
library(data.table)

x <- fread(file="web_connectivity_tz.csv")
x$date <- as.POSIXct(x$date, tz="UTC")

# Throw away infrequently seen URLs.
# x <- x[, .SD[.N >= 5], by=url]

# Get the average blocking rate for each URL (regardless of date and asn).
overall <- x[, .(blocking = sum(blocked != "false") / .N, N = .N), by = url]

# Sort the URLs by overall blocking rate and number of observations, rather than
# alphabetically.
# x$url <- factor(x$url, levels = overall$url[order(overall$blocking, overall$N)])

# Discard URLs that have a zero rate of overall blocking.
x <- x[overall[blocking > 0], , on=.(url)]

# Put asn in numeric order.
x[, asn:=factor(asn, levels=unique(x$asn[order(as.integer(sub("^AS", "", x$asn)))]))]

x$anomaly_type <- ifelse(x$blocked == "false", "none", x$blocking_type)
x$anomaly_type <- relevel(factor(x$anomaly_type), "none")

p <- ggplot(x)
p <- p + geom_point(aes(x=date, y=asn, color=anomaly_type), size=3, alpha=0.9)
p <- p + facet_grid(url ~ country)
p <- p + scale_x_datetime(date_minor_breaks="1 day")
p <- p + scale_color_manual(values=c("gray", "red", "darkgreen", "coral", "cyan"))
p <- p + theme_bw()
p <- p + theme(legend.position="top")
p <- p + theme(axis.text.x=element_text(size=6))
p <- p + labs(title="Web connectivity OONI reports in Tanzania")

ggsave("web_connectivity_tz.pdf", p, height=380, width=7, limitsize=FALSE, dpi=300, unit="in")
```

On the same directory where the `CSV` file is saved (`web_connectivity_tz.csv`),
begin the data plotting process by issuing the following command (assuming here
that the R script is named `webct.R`):

```sh
Rscript webct.R
```

<!-- prettier-ignore -->
::: warning NOTE
Depending on data size, this command may take some time to complete.
:::

Once the process is complete, you should be able to find a `PDF` file
(`web_connectivity_tz.pdf`) of the plotted data.

Next, run the script with: `Rscript webct.R`

The script may take some time to run, depending on the number of reports. Upon
successful completion you should be able to see the results in the plot (PDF)
file named as: `web_connectivity_tz.pdf`

### Tanzania Results

Below is an excerpt of plots from the data in file `web_connectivity_tz.pdf`.

These plots illustrate all the domains found in the OONI data for the country of
Tanzania. The autonomous system numbers (AS) are listed on the left side of the
plots, the x-axis contains the measurment dates, and the name of the domain
found in the OONI data is located on the right. The dots depict one or more
measurements found in the OONI data. The colors of the dots (_gray_, _red_,
_darkgreen_, _coral_, and _cyan_) represent the `anomaly_type` found in the
measurement for that date (on the x-axis). The `anomaly_type` depicts the
blocking types found in OONI data. Consult the above section
[Web Connectivity test: Blocking types](data-analysis.md#web-connectivity-test-blocking-types)
for a detailed explanation of the test's blocking types.

![Excerpt of plotted TZ OONI data in file `web_connectivity_tz.pdf`](./assets/files/tz-study/web_connectivity_tz_excerpt.png)
![Excerpt of plotted TZ OONI data in file `web_connectivity_tz.pdf`](./assets/files/tz-study/web_connectivity_tz_excerpt_2.png)

In reviewing the plots we can determine that most network measurements were
collected during the end of 2016 and the start of 2017. A few scattered
measurements continued until the end of 2019.

![Excerpt of plotted TZ OONI data in file `web_connectivity_tz.pdf`](./assets/files/tz-study/web_connectivity_tz_excerpt_3.png)
![Excerpt of plotted TZ OONI data in file `web_connectivity_tz.pdf`](./assets/files/tz-study/web_connectivity_tz_excerpt_4.png)

All available measurements of the website `pornhub.com` show a `http-failure`
error occurred in all ASes, indicating the website was likely blocked in
Tanzania.

The data also indicates that the website `proxyweb.net` was likely blocked as
well - but not on such a consistent basis. We do, however, see a couple of
consistent network measurement failures (`http-failure`, `tcp_ip` and `dns`)
from most ASes. Nonetheless, the results of the OONI data cannot be conclusive
and further research would be required to better understand the reasons behind
the apparent blocking or determine if the websites were unavailable for other
reasons.

![Excerpt of plotted TZ OONI data in file `web_connectivity_tz.pdf`](./assets/files/tz-study/web_connectivity_tz_excerpt_5.png)

Finally, the website `sportingbet.com` also appears to have been blocked in
Tanzania at the end of 2016 and the start of 2017. The blocking types
(`anomaly_type`) for this website were `tcp_ip` and `http-failure`. Notably,
similar studies conducted in other African countries indicate this website has
also been blocked in Kenya and Uganda. More information is available in the
following technical report:
[Kenya: Censorship-free internet? by Maria Xynou (OONI), Arturo Filastò (OONI) and Moses Karanja (CIPIT)](https://web.archive.org/web/20171123155936/https://ooni.torproject.org/post/kenya-study/).

## Case study: Tor Directory Authorities Censorship in Mexico

This next case study walks through an analysis of OONI data from Mexico related
to the reachability of Tor directory authorities.

Tor is a distributed, low-latency anonymity network for TCP-based applications
such as web browsing, email communication, secure shell, instant messaging chat,
and other services. Tor clients can choose a path through the network and build
a secure circuit in which each node (relay or onion router) in the path knows
its immediate predecessor and successor, but no other nodes in the circuit. The
Tor network relies on directory authorities to operate, thus it is essential for
these directory authorities to be reachable from other Tor relays. There are
currently 9 directory authorities (and 1 extra for backup purposes) operated by
trusted individuals. Directory authorities define and serve the consensus
document, defining the "state of the network." This document contains a "router
status" section for every relay currently in the network. Directory authorities
also serve router descriptors, extra info documents, microdescriptors, and the
microdescriptor consensus
([more info here](https://gitweb.torproject.org/torspec.git/tree/glossary.txt#n63)).

The following analysis tests whether these directory authorities are reachable
from inside Mexico. OONI network measurement data of Tor directory authorities
can be found in **Web Connectivity** and **TCP Connect** tests.

<!-- prettier-ignore -->
::: tip FYI
**Steps One** through **Three** provide guidance for obtaining and analyzing
reports from the OONI Web Connectivity tests. **Steps Four** through
**Six** provide guidance for obtaining and analyzing reports from the OONI TCP
Connect tests.
:::

### Step One: Get OONI Web Connectivity reports of Tor directory authorities in Mexico

Begin your analysis by downloading OONI Web Connectivity reports with
measurements to Tor directory authorities from Mexico:

This is the command to get a list of all OONI Web Connectivity reports with
measurements to Tor directory authorities (with IPs: `131.188.40.189`,
`154.35.175.225`, `171.25.193.9`, `193.23.244.244`, `194.109.206.212`,
`199.58.81.140`, `204.13.164.118`, `66.111.2.131`, `86.59.21.38` and
`128.31.0.39`) from Mexico (country code `MX`):

```sh
for input in 131.188.40.189 154.35.175.225 171.25.193.9 193.23.244.244 194.109.206.212 199.58.81.140 204.13.164.118 66.111.2.131 86.59.21.38 128.31.0.39; do wget --no-verbose "https://api.ooni.io/api/v1/measurements?input=${input}&limit=10000&since=2012-01-01&probe_cc=MX&test_name=web_connectivity" -O "${input}-measurements.json" ; sleep 3s ; done
```

This is the command to get a list of all OONI Web Connectivity reports of Tor
directory authorities from Mexico (country code `MX`), the list will be save to
the file `mx-dirauth.list`:

```sh
jq --raw-output '.results[]|.measurement_url' *-measurements.json > mx-dirauth.list
```

Now download the relevant OONI reports listed in file `mx-dirauth.list` with the
following command:

```sh
wget --no-verbose --wait=3 --limit-rate=500k --random-wait --input-file=mx-dirauth.list --header="accept-encoding: gzip"
```

### Step Two: Analyze Web Connectivity OONI reports

A high level description of the Web Connectivity test can be found under
[OONI - Web Connectivity test](https://ooni.torproject.org/nettest/web-connectivity/).
The complete and detailed specifications of Web Connectivity test can be found
[here](https://github.com/ooni/spec/blob/master/nettests/ts-017-web-connectivity.md).

To simplify the analysis, create a file and instruct `jq` to use the filter from
this file. To do so, simply copy the content listed below into a file named
`dirauthcsv.jq` (you can ignore the lines starting with `#` used as comments to
understand what the `jq` filter does):

```jq
# Remove entries that include false OONI run links as input
select(.input | contains("run.ooni.io") | not)
# Set $blocking_type if .test_keys.blocking is not false, but only if
# .test_keys.http_experiment_failure doesn't contain "unknown_failure"
# (which indicates a measurement error and not blocking).
# Git commit: https://github.com/TheTorProject/ooni-probe/commit/d2ace6fc566daec6c4b9549b5f89830929d2d908
  | (.test_keys.blocking and (.test_keys.http_experiment_failure | tostring | contains("unknown_failure") | not)) as $blocking
# Extract an array of columns we want.
  | [.measurement_start_time, .report_id, .probe_cc, .probe_asn, .input, $blocking, .test_keys.blocking // ""]
# Make CSV.
  | @csv, "\n"
```

The following commands will create a `CSV` file generated from OONI reports
related to measurements of Tor directory authorities from the Web Connectivity
test (note: this may take some time, but you will be able to see the progress of
the task):

```sh
(echo date,report_id,country,asn,url,blocked,blocking_type; gunzip -dc temp-id* | jq -j -f dirauthcsv.jq --unbuffered) | tee dirauth_mx.csv
```

Once the task is complete, you should be able to find the file you just created
under the name `dirauth_mx.csv`.

The file should have the following `CSV` header:
`date,report_id,country,asn,url,blocked,blocking_type`

Please refer to the section [CSV header explanation](#csv-header-explanation)
for a detailed explanation of the CSV header.

### Step Three: Plotting the data with R

Now it is time to use R to plot the data in the `CSV` file (`dirauth_mx.csv`).

To do so, copy the following contents into a file (`mx-dirauth.R`):

```R
library(ggplot2)
library(data.table)

x <- fread(file="dirauth_mx.csv")
x$date <- as.POSIXct(x$date, tz="UTC")
# Put asn in numeric order.
x[, asn:=factor(asn, levels=unique(x$asn[order(as.integer(sub("^AS", "", x$asn)))]))]

x$anomaly_type <- ifelse(x$blocked == "false", "none", x$blocking_type)
x$anomaly_type <- relevel(factor(x$anomaly_type), "none")

# Rename Tor directory authority URLs to their nicknames
x$url <- replace(x$url, x$url=="http://128.31.0.39/tor/status-vote/current/consensus.z", "moria1")
x$url <- replace(x$url, x$url=="http://128.31.0.39:9131/tor/server/authority", "moria1")
x$url <- replace(x$url, x$url=="http://131.188.40.189/tor/server/authority", "gabelmoo")
x$url <- replace(x$url, x$url=="http://131.188.40.189/tor/status-vote/current/consensus.z", "gabelmoo")
x$url <- replace(x$url, x$url=="http://154.35.175.225/tor/server/authority", "Faravahar")
x$url <- replace(x$url, x$url=="http://154.35.175.225/tor/status-vote/current/consensus.z", "Faravahar")
x$url <- replace(x$url, x$url=="http://171.25.193.9/tor/status-vote/current/consensus.z", "maatuska")
x$url <- replace(x$url, x$url=="http://171.25.193.9:443/tor/server/authority", "maatuska")
x$url <- replace(x$url, x$url=="http://193.23.244.244/tor/server/authority", "dannenberg")
x$url <- replace(x$url, x$url=="http://193.23.244.244/tor/status-vote/current/consensus.z", "dannenberg")
x$url <- replace(x$url, x$url=="http://194.109.206.212/tor/server/authority", "dizum")
x$url <- replace(x$url, x$url=="http://194.109.206.212/tor/status-vote/current/consensus.z", "dizum")
x$url <- replace(x$url, x$url=="http://199.58.81.140/tor/server/authority", "longclaw")
x$url <- replace(x$url, x$url=="http://199.58.81.140/tor/status-vote/current/consensus.z", "longclaw")
x$url <- replace(x$url, x$url=="http://204.13.164.118/tor/server/authority", "bastet")
x$url <- replace(x$url, x$url=="http://204.13.164.118/tor/status-vote/current/consensus.z", "bastet")
x$url <- replace(x$url, x$url=="http://66.111.2.131:9030/tor/server/authority", "Serge")
x$url <- replace(x$url, x$url=="http://86.59.21.38/tor/server/authority", "tor26")
x$url <- replace(x$url, x$url=="http://86.59.21.38/tor/status-vote/current/consensus.z", "tor26")

p <- ggplot(x)
p <- p + geom_point(aes(x=date, y=asn, color=anomaly_type), size=4, alpha=0.9)
p <- p + facet_grid(url ~ country)
p <- p + scale_x_datetime(date_minor_breaks="1 day", date_labels="%b %Y")
p <- p + scale_color_manual(values=c("gray", "red", "red4", "coral"))
p <- p + theme_linedraw()
p <- p + theme(legend.position="top")
p <- p + theme(axis.text.x=element_text(size=6))
p <- p + labs(title="Blocking of Tor directory authorties in Mexico")

ggsave("mx-dirauth.png", p, width=12, height=16, dpi=200)
```

On the same directory where the `CSV` file is saved (`dirauth_mx.csv`), begin
the data plotting process by issuing the following command (assuming here that
the R script is named `mx-dirauth.R`):

```sh
Rscript mx-dirauth.R
```

<!-- prettier-ignore -->
::: warning NOTE
Depending on data size, this command may take some time to complete.
:::

Once the process is complete, you should be able to find a `PNG` file
(`mx-dirauth.png`) of the plotted data.

### Mexico Results (Part One)

Below is the generated plotted data in file `mx-dirauth.png`:

![Plotted MX Tor directory authorities OONI data in file `mx-dirauth.png`](./assets/files/mx-study/mx-dirauth.png)

From the plot of OONI data from Mexico we can determine that 7 out of the 10
total Tor directory authorities are being blocked by AS8151. The network
measurements for this AS have been consistent and longitudinal with a large
period of daily measurements. This is a significant restriction.

In order to better understand and cross verify our findings (derived from the
plot) we will proceed to Step Four and analyze the TCP Connect reports for the
Tor directory authorities in Mexico.

### Step Four: Get OONI TCP Connect reports of Tor directory authorities in Mexico

The OONI TCP Connect test checks to see if a TCP connection can be successfully
established to a given endpoint. For this case study, we're assessing the
reachability of the Tor directory authorities from probes that performed
measurements in Mexico. The complete and detailed specifications of the TCP
Connect test can be found under
[OONI Specifications - TCP Connect test](https://github.com/ooni/spec/blob/master/nettests/ts-008-tcp-connect.md).

Begin your analysis by downloading OONI TCP Connect test reports with
measurements to Tor directory authorities from Mexico:

This is the command to get a list of all OONI TCP Connect test reports with
measurements to Tor directory authorities (with IPs: `131.188.40.189`,
`154.35.175.225`, `171.25.193.9`, `193.23.244.244`, `194.109.206.212`,
`199.58.81.140`, `204.13.164.118`, `66.111.2.131`, `86.59.21.38` and
`128.31.0.39`) from Mexico (country code `MX`):

```sh
for input in 131.188.40.189 154.35.175.225 171.25.193.9 193.23.244.244 194.109.206.212 199.58.81.140 204.13.164.118 66.111.2.131 86.59.21.38 128.31.0.39; do wget --no-verbose "https://api.ooni.io/api/v1/measurements?input=${input}&limit=10000&since=2012-01-01&probe_cc=MX&test_name=tcp_connect" -O "${input}-measurements.json" ; sleep 3s ; done
```

This is the command to get a list of all OONI TCP Connect test reports of Tor
directory authorities from Mexico (country code `MX`), the list will be save to
the file `mx-tcp-dirauth.list`:

```sh
jq --raw-output '.results[]|.measurement_url' *-measurements.json > mx-tcp-dirauth.list
```

Now download the relevant OONI reports listed in file `mx-tcp-dirauth.list` with
the following command:

```sh
wget --no-verbose --wait=3 --limit-rate=500k --random-wait --input-file=mx-dirauth.list --header="accept-encoding: gzip"
```

### Step Five: Analyze TCP Connect test OONI reports

The following commands will generate a `CSV` file generated from OONI reports
related to measurements of Tor directory authorities from the TCP Connect test
(note: this may take some time, but you will be able to see the progress of the
task):

```sh
(echo "date,report_id,country,asn,endpoint,connection"; gunzip -dc temp-id* | jq -r '[.measurement_start_time,.report_id,.probe_cc,.probe_asn,.input,.test_keys.connection]|@csv') > mx-tcp-dirauth.csv
```

Once the task is complete, you should be able to find a file of the generated
CSV under the name `mx-tcp-dirauth.csv`.

The file should have the following `CSV` header:
`date,report_id,country,asn,endpoint,connection`

Please refer to the section [CSV header explanation](#csv-header-explanation)
for a detailed explanation of the CSV header.

### Step Six: Plotting the data with R

Now it is time to use R to plot the data in the `CSV` file
(`mx-tcp-dirauth.csv`).

To do so, copy the following contents into a file (`mx-tcp-dirauth.R`):

```R
library(ggplot2)
library(data.table)

x <- fread(file="mx-tcp-dirauth.csv")
x$date <- as.POSIXct(x$date, tz="UTC")
# Put asn in numeric order.
x[, asn:=factor(asn, levels=unique(x$asn[order(as.integer(sub("^AS", "", x$asn)))]))]

# Rename Tor directory authority endpoints to their nicknames
x$endpoint <- replace(x$endpoint, x$endpoint=="128.31.0.39:9101", "moria1")
x$endpoint <- replace(x$endpoint, x$endpoint=="128.31.0.39:9131", "moria1")
x$endpoint <- replace(x$endpoint, x$endpoint=="131.188.40.189:443", "gabelmoo")
x$endpoint <- replace(x$endpoint, x$endpoint=="131.188.40.189:80", "gabelmoo")
x$endpoint <- replace(x$endpoint, x$endpoint=="154.35.175.225:443", "Faravahar")
x$endpoint <- replace(x$endpoint, x$endpoint=="154.35.175.225:80", "Faravahar")
x$endpoint <- replace(x$endpoint, x$endpoint=="171.25.193.9:443", "maatuska")
x$endpoint <- replace(x$endpoint, x$endpoint=="171.25.193.9:80", "maatuska")
x$endpoint <- replace(x$endpoint, x$endpoint=="193.23.244.244:443", "dannenberg")
x$endpoint <- replace(x$endpoint, x$endpoint=="193.23.244.244:80", "dannenberg")
x$endpoint <- replace(x$endpoint, x$endpoint=="194.109.206.212:443", "dizum")
x$endpoint <- replace(x$endpoint, x$endpoint=="194.109.206.212:80", "dizum")
x$endpoint <- replace(x$endpoint, x$endpoint=="199.58.81.140:443", "longclaw")
x$endpoint <- replace(x$endpoint, x$endpoint=="199.58.81.140:80", "longclaw")
x$endpoint <- replace(x$endpoint, x$endpoint=="204.13.164.118:443", "bastet")
x$endpoint <- replace(x$endpoint, x$endpoint=="204.13.164.118:80", "bastet")
x$endpoint <- replace(x$endpoint, x$endpoint=="66.111.2.131:9001", "Serge")
x$endpoint <- replace(x$endpoint, x$endpoint=="66.111.2.131:9030", "Serge")
x$endpoint <- replace(x$endpoint, x$endpoint=="86.59.21.38:443", "tor26")
x$endpoint <- replace(x$endpoint, x$endpoint=="86.59.21.38:80", "tor26")

p <- ggplot(x)
p <- p + geom_point(aes(x=date, y=asn, color=connection), size=3, alpha=0.4)
p <- p + facet_grid(endpoint ~ country)
p <- p + scale_x_datetime(date_breaks="1 month", date_minor_breaks="12 hours", date_labels="%b %Y")
p <- p + scale_color_manual(values=c("gray", "red", "red4", "blue"))
p <- p + theme_linedraw()
p <- p + theme_bw()
p <- p + theme(legend.position="top")
p <- p + theme(axis.text.x=element_text(size=6))
p <- p + labs(title="Blocking of Tor directory authorties in Mexico")

ggsave("mx-tcp-dirauth.png", p, width=25, height=20, dpi=200)
```

On the same directory where the `CSV` file is saved (`mx-tcp-dirauth.csv`),
begin the data plotting process by issuing the following command (assuming here
that the R script is named `mx-dirauth.R`):

```sh
Rscript mx-tcp-dirauth.R
```

<!-- prettier-ignore -->
::: warning NOTE
Depending on data size, this command may take some time to complete.
:::

Once the process is complete, you should be able to find a `PNG` file
(`mx-tcp-dirauth.png`) of the plotted data.

### Mexico Results (Part Two)

Below is the generated plotted data file `mx-tcp-dirauth.png`:

![Excerpt of plotted MX Tor directory authorities OONI data in file `mx-tcp.dirauth.png`](./assets/files/mx-study/mx-tcp-dirauth.png)

As a reminder, the TCP Connect test checks to see if the connection to a given
endpoint was successful or not. When the connection succeeeds, it returns
`successful` whereas in case of failure it records the reason of the failure
i.e. `connect_error`, `connection_refused_error`, or `generic_timeout_error`.

As we can see, the network measurements in the plot above start a bit earlier
than mid-December 2016 and end at the start of October 2019. The data provide
excellent coverage from multiple networks and longitudinal measurements to help
us understand if blocking is persistent, and when the blocking has been lifted
(if this is the case). With the exception of a few Tor directory authorities
that the TCP Connect was able to connect to them successfully (`Serge`, `bastet`
and `longclaw`), the data reveals that the majority of directory authorities
returned connection errors throughout the entire measurement period (mostly
`generic_timeout_error`). The results of this plot cross-verify the results from
the plot in above section
[Step Three: Plotting the data with R](data-analysis.md#step-three-plotting-the-data-with-r).

For interested users, the publications and presentations listed below provide
additional information about the blocking of Tor directory authorities in
Mexico.

### References

- Distributed Detection of Tor Directory Authorities Censorship in Mexico
  [[paper](https://tics.site/proceedings/2019a/icn_2019_6_20_38010.pdf),
  [presentation](https://tics.site/proceedings/2019a/icn_2019_6_20_38010-presentation.pdf)]

- Civil Forensic on Removing Roadblocks to the Growth Tor Network from Latin
  American
  [[presentation](https://tics.site/proceedings/2019a/icn_2019_naj2019.pdf)]

## Other helpers

Detailed below are other useful tools and helper script/command snippets that
can be used to assist with OONI data analysis.

### Generate OONI explorer links with jq

To generate a URL that links to a specific measurement in OONI Explorer, use the
following `jq` syntax:

`https://explorer.ooni.torproject.org/measurement/\(.report_id|@uri)?input=\(.input|join(":")|@uri)`

For example, here is how to generate a table from a directory full of reports:

```sh
cat *.json | jq -r '[.measurement_start_time,.probe_cc,.probe_asn,.test_name,"https://explorer.ooni.torproject.org/measurement/\(.report_id|@uri)?input=\(.input|join(":")|@uri)"]|@tsv'
```

And here is how to do so if you used the `-xz` option of `ooni-sync`, `xz`
compressed files:

```sh
xz -dc *.json.xz | jq -r '[.measurement_start_time,.probe_cc,.probe_asn,.test_name,"https://explorer.ooni.torproject.org/measurement/\(.report_id|@uri)?input=\(.input|join(":")|@uri)"]|@tsv'
```

Alternatively if you have downloaded the reports in `gzip` compressed file
format (used in section
[Case study: Tor Directory Authorities Censorship in Mexico](#case-study-tor-directory-authorities-censorship-in-mexico)
), use the following commands:

```sh
gunzip -dc temp-id* | jq -r '[.measurement_start_time,.probe_cc,.probe_asn,.test_name,"https://explorer.ooni.torproject.org/measurement/\(.report_id|@uri)?input=\(.input|@uri)"]|@tsv'
```

<!--
#### Examing HTTP Header Field Manipulation

XXX add test intro

This an OONI test, more info here:
https://ooni.torproject.org/nettest/http-header-field-manipulation/

Spec test info here:
https://github.com/ooni/spec/blob/master/nettests/ts-006-header-field-manipulation.md

XXX Upload scripts used to parse reports

#### Examing HTTP invalid request line

XXX add test intro

This an OONI test, more info here:
https://ooni.torproject.org/nettest/http-invalid-request-line/

Spec test info here:
https://github.com/ooni/spec/blob/master/nettests/ts-007-http-invalid-request-line.md

XXX Upload scripts used to parse reports

#### Examining TCP connection test reports

XXX add test intro

This an OONI test, more info here:
(Short of this description but not only for bridges)
https://ooni.torproject.org/nettest/tor-bridge-reachability/

Spec test info here:
https://github.com/ooni/spec/blob/master/nettests/ts-008-tcp-connect.md

XXX Upload scripts used to parse reports

#### Examing Vanilla Tor reports

XXX add test intro

This an OONI test, more info here:

https://ooni.torproject.org/nettest/vanilla-tor/

Spec test info here:
https://github.com/ooni/spec/blob/master/nettests/ts-016-vanilla-tor.md

XXX Upload scripts used to parse reports
-->
