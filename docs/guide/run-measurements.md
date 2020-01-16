# Performing network measurements

This section of the magma guide provides guidance for how to perform and
orchestrate network measurements. It currently contains only OONI-developed
software as we are reviewing more software that can be added to this section.
Please feel free to propose other software or contribute by adding a section to
the guide on how to perform network measurements with other software that
performs network measurements.

## OONI

[OONI](https://ooni.org), the Online Observatory of Network Interference,
develops software with which users can perform network measurement to detect
Internet censorship or other forms of network interference. The measurement tool
that performs the measurements is called OONI Probe. By using the OONI Probe
client, users can collect data to use as evidence of Internet censorship because
the data returned will show how, when, where, and who implemented any network
interference.

OONI probe runs on various OS types (Android, iOS, macOS, and Linux) and user
interfaces (command-line, Web, and native graphical). The various clients
(versions) have been developed in different programming languages (Python with
the [Twisted networking framework](http://twistedmatrix.com/) is being used for
desktop, servers, and embedded devices; mobile platforms use the portable C++11
network measurement library
[measurement-kit](https://github.com/measurement-kit/measurement-kit).

Official supported software for OONI Probe, along with installation
instructions, can be found here:
[OONI Probe](https://github.com/ooni/probe#android-ios-desktop-cli).

### Available tests

A high-level description of the different types of OONI software tests that you
can run to detect interference can be found here:
[OONI Nettest](https://ooni.io/nettest/).

A more detailed list of the test specifications, as well as experimental tests,
can be found here:
[OONI Spec Nettests](https://github.com/ooni/spec/tree/master/nettests).

The various OONI Probe versions have different functionalities and testing
capabilities. The table below lists the different test versions and shows their
availability by software platform:

| Test name                      | Android            | iOS                | macOS              | macOS (legacy)     | Linux              | Linux (legacy)     | Windows            |
| ------------------------------ | ------------------ | ------------------ | ------------------ | ------------------ | ------------------ | ------------------ | ------------------ |
| Bridge Reachability            | :x:                | :x:                | :x:                | :heavy_check_mark: | :x:                | :heavy_check_mark: | :x:                |
| Captive Portal                 | :x:                | :x:                | :x:                | :heavy_check_mark: | :x:                | :heavy_check_mark: | :x:                |
| DASH                           | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :x:                | :heavy_check_mark: | :x:                | :heavy_check_mark: |
| DNS Consistency                | :x:                | :x:                | :x:                | :heavy_check_mark: | :x:                | :heavy_check_mark: | :x:                |
| DNS Injection                  | :x:                | :x:                | :x:                | :heavy_check_mark: | :x:                | :heavy_check_mark: | :x:                |
| DNS Spoof (deprecated)         | :x:                | :x:                | :x:                | :heavy_check_mark: | :x:                | :heavy_check_mark: | :x:                |
| Facebook Messenger             | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| HTTP Header Field Manipulation | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| HTTP Host                      | :x:                | :x:                | :x:                | :heavy_check_mark: | :x:                | :heavy_check_mark: | :x:                |
| HTTP Invalid Request Line      | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| HTTP Requests                  | :x:                | :x:                | :x:                | :heavy_check_mark: | :x:                | :heavy_check_mark: | :x:                |
| Lantern                        | :x:                | :x:                | :x:                | :heavy_check_mark: | :x:                | :heavy_check_mark: | :x:                |
| Meek Fronted Requests          | :x:                | :x:                | :x:                | :heavy_check_mark: | :x:                | :heavy_check_mark: | :x:                |
| Multi Protocol Traceroute      | :x:                | :x:                | :x:                | :heavy_check_mark: | :x:                | :heavy_check_mark: | :x:                |
| NDT                            | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| OpenVPN                        | :x:                | :x:                | :x:                | :heavy_check_mark: | :x:                | :heavy_check_mark: | :x:                |
| Psiphon                        | :x:                | :x:                | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| TCP Connect                    | :x:                | :x:                | :x:                | :heavy_check_mark: | :x:                | :heavy_check_mark: | :x:                |
| Telegram                       | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| Vanilla Tor                    | :x:                | :x:                | :x:                | :heavy_check_mark: | :x:                | :heavy_check_mark: | :x:                |
| Web Connectivity               | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| WhatsApp                       | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| bridgeT (deprecated)           | :x:                | :x:                | :x:                | :heavy_check_mark: | :x:                | :heavy_check_mark: | :x:                |

### Fingerprintability

OONI Probe is a network measurement tool that performs various tests to detect
potential interference on a network. Like any other software or remote computing
device that transmits network packets, OONI Probe software can therefore be
distinguished on a network by having a unique (or quite unique) fingerprint.

A digital “fingerprint” is any information about a device or software that
transmits network packets that can be collected for the purpose of
identification or classification of the device. A fingerprint may reveal certain
characteristics of the underlying client or other related information that can
be used to identify a specific device/system/software. Smart TVs, for example,
have a very unique fingerprint and can be easily distinguished in a network.

The OONI team has undertaken significant effort to reduce the fingerprintability
of OONI Probe. Nonetheless, there are still certain common identifiers and
characteristics related to the OONI Probe that should be considered when users
are deciding whether to perform network measurements with OONI Probe.

#### User agent identification

A user agent (UA or user-agent) string consists of one or more product
identifiers, each followed by zero or more comments which together identify the
user agent software and its significant subproducts (source:
[RFC 7231](https://tools.ietf.org/html/rfc7231#section-5.5.3)). An example of a
user agent string is the name and version of the operating system, device, and
software used for the network packets transmission.

The following table lists user agent strings transmitted by various OONI Probe
tests.

| Test Name                      | User-Agent                                                                                                                                                                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Captive Portal Test            | Apple, Microsoft and Mozilla vendor specific ([details](https://github.com/ooni/probe-legacy/blob/master/ooni/nettests/manipulation/captiveportal.py#L492))                     |
| HTTP Requests                  | Test "User-Agent": "Mozilla/5.0 (Windows; U; Windows NT 6.1; de; rv:1.9.2) Gecko/20100115 Firefox/3.6"                                                                          |
| Header Field Manipulation Test | Randomly selected [variants](https://github.com/ooni/spec/blob/master/nettests/ts-006-header-field-manipulation.md#test-description) of Mozilla Firefox and Safari web browsers |
| Web Connectivity               | Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36                                                                          |

As mentioned, OONI carefully chooses the user agent strings used by various
tests with the goal of minimizing fingerprintability risk for users running OONI
Probe.

#### Further resources

The sources below provide additional information regarding the anonymity tests
of web browsers and fingerprintability of user agents.

- How Unique Is Your Web Browser by Peter Eckers
  [Archived PDF](https://web.archive.org/web/20130315002132/http://panopticlick.eff.org/browser-uniqueness.pdf)
- AmIUnique.org additional links
  [useful resources and links on fingerprinting](https://web.archive.org/web/20191106160754/https://amiunique.org/links)

### Helpers

This section lists available tools that can be used by users to help streamline
the process of running tests (network measurements) with OONI Probe.

#### OONI Run

The OONI run website allows users to share their custom OONI tests with a list
of URLs. The website generates a special type of link that instructs OONI Probe
to run specific tests (as defined by the OONI Run). Complete instructions and an
introductory post on OONI run can be found here:
[https://ooni.org/post/ooni-run/](https://ooni.org/post/ooni-run/).

Please note if you have a long list of URLs to enter, you can simply copy and
paste them into the first URL slot on the OONI Run website. Your list of URLs
should be formatted as either one URL per line:

```
https://www.example1.net
https://www.example2.org
```

Or with a space separating each entry:

`https://www.example1.net https://www.example2.org`

Source: [OONI Run website](https://run.ooni.io/)

#### OONI Run (offline version)

The OONI Run link generator script (`rungen.py`) generates an OONI Run link
without the need to access an online website. It also allows users to
programmatically generate OONI Run links. This is the Python version of the
original
[ooni-run script](https://github.com/ooni/run/blob/master/utils/links.js) (it
uses Python version 3). Usage and instructions on how to run the script can be
found here: [OONI-rungen usage](https://github.com/azadi/ooni-rungen#usage).

Source: [ooni-rungen](https://github.com/azadi/ooni-rungen)

### Hardware-assisted network measurements

#### Lepidopter

Lepidopter is a Raspberry Pi distribution image with all the required
dependencies and software packages in place, configured to run network
measurement tests via the OONI Probe software. It is developed and designed to
require no physical attendance upon first start (boot up of the device), but
also allows experienced users to further configure it as they wish. The source
code and the building scripts of the Lepidopter image are free and open source
software (the image is based on the python (legacy) version of OONI Probe).
Lepidopter currently requires the minimal physical attendance possible to
perform longitudinal, daily network measurements with OONI Probe.

You can read the complete installation instructions here:
[Lepidopter Installation: Help Guides and Resources](https://ooni.torproject.org/install/lepidopter/).
Or you can simply download and copy the image to an SD card here:
[Lepidopter releases](https://github.com/TheTorProject/lepidopter/releases).

### Risks

As with any type of network measurement research, using OONI Probe involves
risks. Fortunately, the OONI team has taken many precautions to minimize risks
associated with their software and has published extensive documentation and
guidelines on the potential risks associated with the possession, installation,
usage, and submission of network measurements from OONI Probe. You can read
about them here:
[Risks: Things you should know before using OONI Probe](https://ooni.torproject.org/about/risks/).

The potential risks associated with running network measurements via OONI Probe
can be summarized as (taken verbatim from the following
[source](https://ooni.torproject.org/about/risks/)):

- Anyone monitoring your internet activity (e.g. ISP, government, employer) will
  be able to see that you are running OONI Probe;

- OONI’s Web Connectivity test connects to and downloads data from a broad range
  of sites, including provocative or objectionable sites (e.g. pornography),
  which might be illegal in some countries;

- By default, all network measurement data collected by OONI Probe is published
  to increase transparency of internet censorship, foster public debate, and
  support research. However, sending local network information to foreign
  servers might not be viewed favourably by some governments. While the data
  published is restricted to what is necessary to identify cases of censorship
  (and we do our best to not publish IP addresses), motivated ISPs might attempt
  to identify OONI Probe users through public OONI data.

Additionally, OONI has compiled a
[threat model document](https://github.com/ooni/spec/wiki/Threat-Model) that
outlines hypothetical security risks for
[OONI's associated roles](https://github.com/ooni/spec/wiki/Roles); a distinct
set of behaviors and interests with respect to OONI's operation.

Provided below are the relevant potential privacy risks and threats associated
with using OONI Probe. These sections on Bad Report Data, Bad Non-Report Data,
Deanonymizing Data Correlation, and Resource Risks are drawn verbatim, with
omissions of non-relevant portions, from
[OONI's threads document](https://github.com/ooni/spec/wiki/Threats). The
complete version of this section can be found in
[OONI - Threats](https://github.com/ooni/spec/wiki/Threats).

#### Bad Report Data

[Source](https://github.com/ooni/spec/wiki/Threats#bad-report-data)

<!-- prettier-ignore -->
::: warning NOTE
These threats involve the production or consumption of report data itself. An
attacker may attempt to modify or influence report data, or they may use report
data to compromise privacy.
:::

**"Toxic" Report Data** - Whose contents is a risk for someone, even when
accurate.

- Privacy-compromising (actual and perceived):

  - OONI Probe operator: Usage exposure - Reports exposing that a OONI Probe
    Operator uses OONI Probe
  - OONI Probe operator: Personal exposure - Reports exposing personal
    information of the OONI Probe Operator

- Illegal data - Illegal data distinct from privacy exposing data -- e.g. child
  abuse material

#### Bad Non-Report Data

[Source](https://github.com/ooni/spec/wiki/Threats#bad-non-report-data)

**"Toxic" Non-Report Data** - This potential data gathered "out of band"
represents a risk to various roles.

<!-- prettier-ignore -->
::: warning NOTE
This is distinct from Bad Report Data. In the case of Bad Report Data, an
attacker manipulates the storage/publication of the data, or they use the
publicly available report data to subvert privacy assumptions. In this section,
an attacker relies on non-report data such as web server logs, proxy logs,
etc...
:::

- Privacy-compromising (actual and perceived):
  - OONI Probe operator: Usage exposure from traffic - Network traffic exposing
    that a OONI Probe operator uses OONI Probe -- e.g. An HTTP net-test has an
    identifiable signature gathered from the target web server. e.g. An SSL
    net-test has an identifiable signature gathered from passive traffic
    recording of a handshake.
  - OONI Probe operator: Usage exposure from local forensics - A forensic
    examination of a OONI Probe operator's host reveals the use and history of
    OONI Probe operation.
  - OONI Probe operator: Personal exposure from traffic - Network traffic
    exposing personal information of the OONI Probe Operator -- e.g. net-test
    traffic includes filesystem paths, revealing the user name.
  - Bystander personal: Exposure from traffic - Network traffic exposes personal
    information of arbitrary Bystanders, for example, due to net-test inputs
    supplied to a test deck. e.g. A OONI Probe Operator provides the URL for a
    specific Facebook user to OONI Probe, and a search over passive network logs
    matches that particular Facebook account.
  - Private infrastructure: Exposure from traffic - Network traffic exposing
    private infrastructure details -- e.g. an HTTP net-test passes through a
    bystander's transparent proxy which adds a header with its IP address.

#### Deanonymizing Data Correlation

[Source](https://github.com/ooni/spec/wiki/Threats#deanonymizing-data-correlation)

This category represents a risk to privacy due to correlation from multiple data
sources, including report and non-report data.

- OONI Probe operator: usage exposure from correlation - The fact that a OONI
  Probe operator ran OONI Probe can be deduced by correlating multiple data
  source -- e.g. Timing information in published reports and router logs are
  analyzed together to determine a OONI Probe operator was running OONI Probe.

- OONI Probe operator: personal exposure from correlation - Personal details
  about a OONI Probe operator can be deduced by correlating multiple data source
  -- e.g. Timing information in published reports, router logs, and video
  recordings from an internet cafe are analyzed together to determine the face
  or identity of a OONI Probe operator.

- Bystander: personal exposure from correlation - Multiple data sources are
  correlated to deduce personal information about a Bystander -- e.g. Timing
  information from published reports along with censoring firewall policy change
  time correlation reduce the IP search space to a small set and all users of an
  ISP are investigated.

- Private infrastructure: exposure from correlation - Data correlation reveals
  details about private infrastructure -- e.g. A report includes reverse DNS
  lookups with associated timing information, which is correlated to DNS server
  logs to deduce details about the OONI Probe operator's DNS configuration.

#### Resource Risks

[Source](https://github.com/ooni/spec/wiki/Threats#resource-risks)

<!-- prettier-ignore -->
::: warning NOTE
This section is about abusing resources (whether intentional or inadvertant)
independent of report data or non-report data privacy issues. Threats involving
report or non-report data often also involve resource abuse, so these are
distinct, but non-overlapping categories of threat.
:::

**Direct Compromise**

- OONI Probe compromise via net-test - A vulnerability in a net-test allows the
  network or measurement target hosts to compromise the OONI Probe host.
- OONI Probe compromise via collector - A vulnerability in the collector lookup
  mechanism, or collector client allows a malicious lookup service (such as
  mlab-ns) or collector to compromise the OONI Probe host.

**Leveraged Attacks**

These threats involve abusing OONI infrastructure to attack other systems.

- OONI Probe localhost leveraged attack - A vulnerability in OONI Probe allows a
  remote attacker to attack other processes on the OONI Probe host. e.g. A user
  is running a service which accepts connections only from localhost, and a
  malicious test input causes OONI Probe to reflect an attack vector to that
  internal third-party service.
- OONI Probe extra-host leveraged attack - A vulnerability in OONI Probe allows
  a remote attacker to attack other hosts via the OONI Probe process. e.g. A
  malicious input causes OONI Probe to forward a remote expoit to a vulnerable
  third party web server.

### Data policy

OONI Probe allows users to opt-out from having their data (network measurements)
published in OONI's database. You can review the complete list of opt-out
options here:
[OONI Data Policy](https://ooni.torproject.org/about/data-policy/).

The data collected by OONI is summarized in the following table.

| Type of data collected                      | Opt-out option               |
| ------------------------------------------- | ---------------------------- |
| Country code                                | :heavy_check_mark:           |
| Data format version                         | :x:                          |
| Date and time of measurements               | :x:                          |
| IP address (**not collected** by default)   | :heavy_check_mark: (default) |
| Network city (`probe_city`)                 | :heavy_check_mark:           |
| Network info (ASN)                          | :heavy_check_mark:           |
| Network measurements                        | :heavy_check_mark:           |
| Network type (mobile/wifi)                  | :x:                          |
| OONI Probe's DNS resolver IP                | :x:                          |
| OONI Probe's engine name and version        | :x:                          |
| OONI Probe's platform, and version          | :x:                          |
| OONI backend version                        | :x:                          |
| Report filename                             | :x:                          |
| Test helpers used                           | :x:                          |
| Test input (URL, IP)                        | :x:                          |
| Test name, options used, run and start time | :x:                          |

[OONI Data formats specification](https://github.com/ooni/spec/blob/master/data-formats/df-000-base.md#specification)
describes all data options used by the OONI software.
