# Glossary

When reviewing the magma guide, you may stumble across some unfamiliar concepts
and highly technical terms. If you encounter an undefined term that is difficult
for you to understand, please feel free to
[open an issue](https://github.com/lavafeld/magma-guide/issues/new) to request
the definition be added to this glossary. Similarly, more experienced users
should feel free to [contribute](contribute.md) and add new terms to the
glossary whenever they see fit.

This glossary, like all other sections of the magma guide, will be updated on a
rolling basis.

## Networking

### Ping

Ping is a tool used to send network packets (`ICMP ECHO_REQUEST`) to a
destination host and waits to elicit a response (`ICMP ECHO_RESPONSE`) in order
to determine if the destination host is reachable and the round-trip packet time
taken to reply.

Example output of ping tool to `magma.lavafeld.org`:

```
PING magma.lavafeld.org (37.218.242.177) 56(84) bytes of data.
64 bytes from 37.218.242.177: icmp_seq=1 ttl=54 time=22.7 ms
64 bytes from 37.218.242.177: icmp_seq=2 ttl=54 time=23.5 ms
64 bytes from 37.218.242.177: icmp_seq=3 ttl=54 time=22.9 ms

--- magma.lavafeld.org ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2003ms
rtt min/avg/max/mdev = 22.798/23.085/23.548/0.330 ms
```


### Traceroute

Traceroute is a tool used to track a packet through the network to a specific
destination host. It shows the IP addresses and the round-trip packet times as
it traces the route to the destination.

Example output of traceroute tool to `example.org`:

```
traceroute to example.org (93.184.216.34), 30 hops max, 60 byte packets
 1  gi0-6-1-19.201.rcr21.osl01.atlas.cogentco.com (130.117.254.161)  0.672 ms  0.688 ms
 2  be3392.ccr41.ham01.atlas.cogentco.com (130.117.3.65)  15.991 ms  16.008 ms
 3  be2815.ccr41.ams03.atlas.cogentco.com (154.54.38.205)  24.911 ms  24.755 ms
 4  be12194.ccr41.lon13.atlas.cogentco.com (154.54.56.93)  32.174 ms  31.990 ms
 5  be2099.ccr31.bos01.atlas.cogentco.com (154.54.82.34)  94.178 ms  94.205 ms
 6  btn.lax05.atlas.cogentco.com (154.54.12.10)  94.593 ms verizondms.bos01.atlas.cogentco.com (154.54.11.54)  94.719 ms
 7  152.195.232.129 (152.195.232.129)  94.580 ms 152.195.233.129 (152.195.233.129)  94.517 ms
 8  93.184.216.34 (93.184.216.34)  93.930 ms  93.949 ms
 9  93.184.216.34 (93.184.216.34)  93.946 ms  93.898 ms
```

## OONI-specific terms

<!-- TODO add content/URLs when these branches are merged to OONI's website.
https://github.com/ooni/ooni.org/blob/glossary/ooni/content/about/glossary.md
https://github.com/ooni/ooni.org/blob/faq/ooni/content/about/faq.md
-->

### Test

Aliases: `nettest`, `net-test`

A network test run by OONI Probe to perform a specific network measurement. A
list of available OONI Probe tests can be found in
[OONI - Nettest](https://ooni.org/nettest/) and their detailed specifications in
[OONI Spec Nettests](https://github.com/ooni/spec/tree/master/nettests).

### Report

A report is a `JSON` formatted file that contains a set of network measurements
from tests run by OONI Probe.
