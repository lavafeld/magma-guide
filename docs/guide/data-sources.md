# Data sources

There are many different types of data sources that can be used to enhance
information controls research. Five particularly relevant data sources are
discussed below: OONI, RIPE, Wehe, Rapid7 Labs, and Censored Planet. A list of
additional sources that can be used to help detect censorship events is also
provided.

## OONI

[OONI](https://ooni.torproject.org), the Open Observatory of Network
Interference, is a global observation network and free software used to detect
censorship, surveillance, and traffic manipulation on the Internet. OONI uses
Free and Open Source Software (FL/OSS) to share observations and data about
network interference. Since 2012, OONI has collected millions of network
measurements from more than 200 countries around the world. It serves as a
powerful resource for researchers, journalists, lawyers, activists, and
advocates interested in exploring network anomalies. Interested researchers can
obtain and analyze OONI data through OONI explorer and OONI API.

### OONI explorer

[OONI Explorer](https://explorer.ooni.torproject.org/) is an easy way to access
and review data that has been gathered by other OONI users. It provides a
graphical data repository per country, allowing anyone to explore and interact
with the network measurements that have been collected through OONI probes. With
it, users can:

- Quickly perform fast queries of OONI data.
- View which websites were most recently blocked in each country.
- Review measurement coverage by test class and tested URL.
- Search within all OONI data with different criteria (blocked URLs, anomalies,
  ASN).
- Limitation: Can be time consuming while performing queries and analyzing
  reports in a wide data range of reports.

### OONI measurements API

[OONI API](https://api.ooni.io/) offers a programmatic way to access, download,
and search OONI data. With it, users can:

- Access complete data (raw network measurements in JSON file format).
- Perform fast data analysis.
- Limitation: Data needs to be downloaded (sufficient storage, network bandwidth
  required).

Additional examples of how to use OONI data can be found in the Data analysis
section of the magma guide:
[How to use OONI data](data-analysis.md#ooni-data-analysis).

## RIPE

[RIPE](https://www.ripe.net/) is the regional Internet registry for Europe, the
Middle East, and parts of Central Asia. As such, it allocates and registers
blocks of Internet number resources to Internet service providers (ISPs) and
other organizations. The not-for-profit organization works to support the RIPE
(Réseaux IP Européens) community and the wider Internet community. The RIPE NCC
membership consists primarily of Internet service providers, telecommunication
organizations, and large corporations.

RIPE provides a variety of data sources including public measurements and BGP
announcement data. Relevant tools and data include:

- [BGPlay](https://stat.ripe.net/special/bgplay/) (an advanced RIPEstat widget
  to visualize BGP routing information)
- Routing Information Service
  [(RIS) raw data](https://www.ripe.net/analyse/internet-measurements/routing-information-service-ris/ris-raw-data)
- [Global certificate and ROA statistics](https://certification-stats.ripe.net/)

<!--
(Resource Public Key Infrastructure (RPKI) describes an approach to build a
formally verifiable database of IP addresses and AS numbers as resources)
-->

## Wehe

[Wehe](https://dd.meddle.mobi/index.html) is a research project based out of
Northeastern University, the University of Massachusetts – Amherst, and Stony
Brook University that collects data on ISP traffic differentiation (typically
bandwidth throttling). The project performs network measurements for popular
applications such as YouTube, Netflix, Amazon Prime Video, Spotify, Skype, and
NBC Sports.

Wehe's data collected after November 2018 can be found
[here](https://wehe-data.ccs.neu.edu/). The code and scripts used to analyze
Wehe data (including a sample dataset) can be found
[here](https://github.com/FangfanLi/weheAnalysisPublicRepo).

## Rapid7 Labs

Rapid7 Labs is the research arm of [Rapid7](https://www.rapid7.com/). Its
[website](https://opendata.rapid7.com/) offers “researchers and community
members open access to data from Project Sonar, which conducts internet-wide
surveys to gain insights into global exposure to common vulnerabilities.” Key
datasets are detailed below:

### 'FDNS' dataset

[Forward DNS (FDNS) dataset](https://opendata.rapid7.com/sonar.fdns_v2/)
contains the responses to DNS requests for all forward DNS names known by
Rapid7's Project Sonar. Until early November 2017, all of these were for the
'ANY' record with a fallback A and AAAA request if necessary. After that time,
the ANY study represents only the responses to ANY requests, and dedicated
studies were created for the A, AAAA, CNAME, and TXT record lookups with
appropriately named files. The file is a GZIP compressed file containing the
name, type, value, and timestamp of any returned records for a given name in
JSON format.

### 'RDNS' dataset

[Reverse DNS (RDNS) dataset](https://opendata.rapid7.com/sonar.rdns_v2/)
includes the responses to the IPv4 PTR lookups for all non-blacklisted/private
IPv4 addresses.

### 'HTTP' dataset

[HTTP GET Responses dataset](https://opendata.rapid7.com/sonar.http/) contains
the responses to HTTP/1.1 GET requests performed against a variety of IPv4
public HTTP endpoints.

### 'HTTPS' dataset

[HTTPS GET Responses dataset](https://opendata.rapid7.com/sonar.https/) contains
the responses to HTTP/1.1 GET requests against various HTTPS ports.

### 'SSL' datasets

#### Common port (443 port) SSL dataset

[SSL Certificates dataset](https://opendata.rapid7.com/sonar.ssl/) contains
X.509 certificate metadata observed when communicating with HTTPS endpoints.

#### Non 443 port SSL dataset

[SSL Certificates (non-443) dataset](https://opendata.rapid7.com/sonar.moressl/)
includes the X.509 certificate metadata observed when communicating with
miscellaneous non-HTTPS endpoints, such as IMAPS, POP3S, or other services.

### 'UDP Scans' dataset

[UDP Scans dataset](https://opendata.rapid7.com/sonar.udp/) contains regular
snapshots of the responses to zmap probes against common UDP services.

### 'TCP Scans' dataset

[TCP Scans dataset](https://opendata.rapid7.com/sonar.tcp/) contains regular
snapshots of the responses to zmap probes against common TCP services.

## The Censored Planet Observatory

[Censored Planet](https://censoredplanet.org) is a longitudinal censorship
measurement platform that collects remote measurement measurements in more than
200 countries. Censored Planet was launched in August 2018, and has since then
collected more than 45 billion measurement data points. Censored Planet measures
network interference on the TCP/IP, DNS, and HTTP(S) protocols, using remote
measurement techniques [Augur](https://censoredplanet.org/projects/augur),
[Satellite](https://censoredplanet.org/projects/satellite), and
[Hyperquack](https://censoredplanet.org/projects/hyperquack) respectively.

Every week, Censored Planet collects reachability data about 2000 popular and
sensitive websites from more than 95,000 vantage points around the world. Apart
from longitudinal scans, Censored Planet also performs rapid focus measurements
of select lists of websites at large scale during censorship events. An academic
paper about Censored Planet can be found
[here](https://censoredplanet.org/assets/censoredplanet.pdf).

Censored Planet’s measurement data has been crucial in identifying and
monitoring several important censorship and network interference events. In
2019, Censored Planet data was used to [study the large-scale HTTPS interception
that occurred in Kazakhstan](https://censoredplanet.org/kazakhstan), and was
instrumental in driving changes in major web browsers that blocked the
interception attack. Censored Planet data has been used to [study Russia’s
decentralized censorship mechanism](https://censoredplanet.org/russia), and [the
throttling attack they performed on
Twitter](https://censoredplanet.org/throttling). Censored Planet has also been
used to [identify the deployment of network censorship
devices](https://censoredplanet.org/filtermap), and [track the blocking of
COVID-19 related websites around the world](https://censoredplanet.org/covid).

Censored Planet data is available to the public through the [Censored Planet
website](https://data.censoredplanet.org/raw). The Censored Planet raw data
website contains archived compressed data files corresponding to one *scan*
using each measurement technique. The data formats and tips for analyzing the
data for each of the published data files and versions are available in the
[Censored Planet documentation](http://docs.censoredplanet.org).

For more information about using the data, please refer to the[Censored Planet
GitHub](https://github.com/censoredplanet/censoredplanet/tree/master/docs), or
email Censored Planet at
[censoredplanet@umich.edu](mailto:censoredplanet@umich.edu).

### Documentation of DNS (Satellite) data

<https://docs.censoredplanet.org/dns.html>

### Documentation of HTTP(S) (Hyperquack) data

<https://docs.censoredplanet.org/http.html>

### Documentation about Censored Planet data analysis

<https://docs.censoredplanet.org/analysis.html>

## Other sources

The following is a list of available data sources that can be used to help
detect a censorship event that is currently on-going, or has taken place.

- Center for Applied Internet Data Analysis (CAIDA):
  [Internet Outage Detection and Analysis (IODA)](http://www.caida.org/projects/ioda/)
- APNIC [DNS Resolver Dashboard](https://stats.labs.apnic.net/rvrs) measures DNS
  recursive resolvers used in various countries and networks.
  [Blog post](https://labs.apnic.net/?p=1260)
- Dyn Research: [Outages Bulletin](http://b2b.renesys.com/eventsbulletin/)
- Internet-Wide Scan Data Repository:
  [Longterm DNS survey](https://scans.io/study/washington-dns)
- NLnet Labs
  [RPKI Analytics](https://www.nlnetlabs.nl/projects/rpki/rpki-analytics/)
- [Cloudflare Cirrus](https://ct.cloudflare.com/logs/cirrus) publicly auditing
  the TLS/SSL certificates issued by certificate authorities
- [Google Product Traffic](https://www.google.com/transparencyreport/traffic/?hl=en#expand=CG)
  data (via Google Transparency Reports)
- [Google Trends](https://trends.google.com) find trending searchers worldwide
  or per country.
- [Internet Intelligence Map](https://map.internetintel.oracle.com/)
- [NDT measurement](https://www.measurementlab.net/tools/ndt/) data (via
  [M-Lab](https://www.measurementlab.net/))
- [NIST RPKI deployment monitor](https://rpki-monitor.antd.nist.gov/)
- [Route Views Project](http://www.routeviews.org/) BGP announcement data
  archive
- [Steam stats](http://store.steampowered.com/stats/)
- [Tor Metrics](https://metrics.torproject.org/) data (which is specific to the
  use of [tor software](https://www.torproject.org/))
