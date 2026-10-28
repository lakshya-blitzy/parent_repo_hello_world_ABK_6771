# 1. Executive Summary

## 1.1 Project Overview

This repository now serves two public HTTP endpoints from a single Node.js process. `GET /` returns `Hello, World!` and `GET /good-evening` returns `Good evening`, both as plain text, and Express is the project's only third-party dependency. The scope is deliberately small: one application file and one one-line manifest at the repository root, nothing existing modified, and the repository's unrelated programs in other languages untouched.

## 1.2 Completion Status

```mermaid
%%{init: {"themeVariables": {"pie1": "#5B39F3", "pie2": "#FFFFFF", "pieOuterStrokeColor": "#B23AF2", "pieTitleTextColor": "#B23AF2", "pieSectionTextColor": "#111111"}}}%%
pie title Project Hours Breakdown
    "Completed Work" : 19
    "Remaining Work" : 8
```

| Metric | Hours |
|--------|-------|
| Total Hours | 27 |
| Completed Hours (AI + Manual) | 19 |
| Remaining Hours | 8 |

**Completion: 70.4% — 19 of 27 hours complete** (19 ÷ 27 × 100 = 70.4%).

The requested capability is delivered and verified end to end. The percentage spans that work together with the productionization still outstanding: dependency verification and pinning, the deployment artifact, network and process posture, operational readiness, and an external regression gate.

## 1.3 Key Accomplishments

- `GET /` answers 200 with `text/plain` and the byte-exact 14-byte `Hello, World!` body.
- `GET /good-evening` answers 200 with `text/plain` and the byte-exact 13-byte `Good evening` body.
- One process holds one listener on port 3000 and serves both routes.
- Express is the only dependency: one manifest entry, a clean install, no repository-root lockfile.
- Both routes were served from this checkout's own installed tree, not merely declared.
- Injection, traversal, credential and malformed-protocol probes leave both bodies byte-identical; the audit reports no advisories.
- The change is additive: two files created, five lines added, nothing modified or deleted.
- No test file, documentation change, lockfile, version file, CI configuration or unrequested hardening was added.

## 1.4 Critical Unresolved Issues

Five of the 23 tracked work items remain open: the 18 delivered requirements are complete and verified, and the path-to-production items below are not.

| Issue | Impact | Owner | ETA |
|-------|--------|-------|-----|
| Dependency range unverified and unpinned (`express ^5.0.0`, no lockfile) | No assurance the resolved line is advisory-clean, and two installs of the same commit can resolve different versions | Release owner | Before first deploy — 2h |
| No deployment artifact (no packaging, service supervision, Node-22 pinning or CI gate) | The service cannot be deployed, supervised or restarted as it stands | Release owner | Before first deploy — 2h |
| Listener posture undeclared (every interface, fixed port, no bind-failure handling, no request timeouts, no graceful shutdown) | Exposure and restart behaviour are undecided by the code | Platform owner | Before first deploy — 2h |
| No readiness or liveness surface and no process-exit monitoring (the process logs nothing) | A crash loop or outage goes undetected | Operations owner | Before first deploy — 1h |
| No automated regression net (no test suite, linter or CI gate) | A future edit or dependency upgrade is guarded only by the syntax gate and review | Engineering owner | With the first change after deploy — 1h |

## 1.5 Access Issues

No access issues identified. The project needs no credentials, no keys, no database and no external service, and reads no configuration. Port 3000 is a code constant, so a second instance on the same host cannot bind until the first stops.

## 1.6 Recommended Next Steps

1. [High] Verify the resolved Express version and its advisories, and decide how builds are pinned (`^5.0.0`, no lockfile) — 2h.
2. [High] Produce the deployment artifact: packaging, a Node major-22 pin, supervision and restart policy — 2h.
3. [Medium] Settle the network and process posture, and note the framework defaults the service exposes — 2h.
4. [Medium] Define operational readiness: a probe path, output capture, alert on non-zero exit — 1h.
5. [Low] Add an external regression gate re-running the route assertions and the dependency audit — 1h.

# 2. Project Hours Breakdown

## 2.1 Completed Work Detail

Each row traces to a delivered requirement; verification rows cover the contract, the dependency surface and the robustness of the delivered capability.

| Component | Hours | Description |
|-----------|-------|-------------|
| Root npm manifest declaring Express | 1.5 | `package.json` created at the repository root carrying exactly `name`, `version` and `dependencies.express` at `^5.0.0`, and nothing else |
| `GET /` registration and byte-exact contract | 2.0 | The 14-byte `Hello, World!` plus one LF body, asserted as `text/plain` on the response rather than left to the framework default |
| `GET /good-evening` registration and byte-exact contract | 2.0 | The 13-byte `Good evening` plus one LF body, asserted as `text/plain` by the handler |
| One framework instance, both registrations and the listener on the constant port | 1.5 | Both routes registered on a single application object in one file, served by one listener bound to port 3000 taken from code, with no second server or helper module |
| Install discipline: no repository-root lockfile, three-field manifest | 1.0 | Dependency installed with `npm install --no-package-lock`, leaving the repository-root lockfile unwritten and the manifest unrewritten |
| Byte-exact contract verification of both routes | 3.5 | Both endpoints driven with independent HTTP clients and a browser, checking status, media type, body bytes and content length, plus the behaviour of unregistered paths, unknown methods, query strings and conditional requests |
| Dependency provisioning, resolution and package-integrity verification | 2.0 | Clean install from a tree without the installed dependencies, resolution of the declared range from the checkout's own tree, confirmation that Express is the only package, and an advisory audit run outside the repository |
| Security and hostile-input verification of the delivered HTTP surface | 3.5 | Injection, traversal, credential, cross-origin, malformed-protocol, oversized and stalled-request probes, with the two responses compared byte for byte against their baselines and the process output inspected for disclosure |
| Startup, lifecycle, concurrency and repeat-stability verification | 2.0 | Cold start from the repository root, single-listener proof, readiness, clean stop and restart, concurrent and pipelined requests, and repeated byte comparisons of every response |

**Total completed: 19 hours.**

## 2.2 Remaining Work Detail

Every row is path-to-production work; none of it changes the two route contracts.

| Category | Hours | Priority |
|----------|-------|----------|
| Dependency verification and version-pinning decision (verify the resolved version and its advisories; decide how builds are pinned given there is no lockfile) | 2 | High |
| Deployment artifact and runtime pinning (package the service, pin Node major 22, define service supervision and restart policy) | 2 | High |
| Network and process posture decision (bind interface and exposure, bind-failure handling, request and header timeouts, shutdown behaviour, and a runbook note of the framework defaults the service exposes) | 2 | Medium |
| Operational readiness definition (probe path against the two routes, process-output capture, alert on non-zero exit) | 1 | Medium |
| External regression gate re-running the byte-exact route assertions and the dependency audit outside the repository | 1 | Low |
| **Total** | **8** | — |

Basis of the estimate: the completed side counts five delivery components and four verification components, and the remaining side counts the five productionization items above, each sized to its own scope rather than to the size of the code that already exists. Completed 19 + remaining 8 = 27 total hours, which is the figure used in Sections 1.2 and 7; 19 ÷ 27 = 70.4% complete.

# 3. Test Results

Every row below records checks that were executed against the delivered code and the running service; the counts are of the individual assertions made in each area.

| Area / Category | Framework | Tests | Passed | Failed | Coverage | What This Proves |
|---|---|---|---|---|---|---|
| Route contract — status, media type and byte-exact bodies for both routes | curl + `od`, scripted HTTP client | 6 | 6 | 0 | n/a | Both endpoints answer exactly the specified bytes, in 200 with `text/plain` |
| Registration specificity and behaviour for the inputs the contract does not fix | curl, scripted client, browser | 6 | 6 | 0 | n/a | Only the two registered paths serve the contract; anything else gets the stock 404, and HEAD, OPTIONS, query strings and unknown methods cannot alter a response body |
| Listener, process surface and configuration | process socket and environment inspection | 3 | 3 | 0 | n/a | One process holds one listener on port 3000 taken from code, with nothing read from the environment and nothing written to its output |
| Concurrency and repeat stability | concurrent, pipelined and repeated clients | 3 | 3 | 0 | n/a | Responses stay byte-exact under 40 concurrent requests, three pipelined requests on one connection, and repeated calls |
| Dependency provisioning and package integrity | npm install, ls, audit (audit run outside the repository) | 5 | 5 | 0 | n/a | Express is the only package, resolves to 5.3.0 from this checkout, no root lockfile is written, and no advisories are reported |
| Syntax gate | `node --check` | 1 | 1 | 0 | n/a | The delivered application file parses cleanly under the target runtime |
| Hostile-input probes on the delivered surface | scripted HTTP client | 6 | 6 | 0 | n/a | Injection, traversal, credential and cross-origin probes leave both responses byte-identical, with no cookie, no CORS header and no disclosed internals |
| Browser end-to-end rendering of both routes | headless Chrome | 3 | 3 | 0 | n/a | Both routes render as a single plain-text line with the exact character counts (14 and 13), and an unregistered path renders the stock 404 |
| **Total** | — | **33** | **33** | **0** | n/a | — |

No coverage percentage is reported: the project installs no coverage tooling and, by design, carries no test suite to instrument.

**Not Covered**

- **No re-runnable test suite exists for either route.** The project deliberately ships no test files, so the checks above are a verification record rather than a gate a future change would fail. The only automated guards in place are the syntax gate and the dependency audit — a regression introduced by an edit to the two handlers would be caught by neither.
- **Nothing has been exercised in a production-like environment.** No container image, service supervisor, reverse proxy or TLS terminator exists or has been run; the service has only ever been started directly from the checkout on a host. A human should deploy a candidate build behind the intended proxy and re-run the two route checks plus a restart cycle before release.
- **The framework's behaviour for inputs the contract does not fix is observed but nowhere asserted.** Conditional `GET` answering 304 with an empty body, `OPTIONS` answering 200 with an `Allow` header, case-insensitive and trailing-slash-tolerant matching, and non-GET methods answering 404 rather than 405 are documented outcomes; a future framework upgrade that changed any of them would go unnoticed, so a human should pin the deployed version and re-check these behaviours after any upgrade.
- **No load, soak or performance measurement was made, and only single-process operation was examined.** Running two instances on one host is untested because the port is a code constant; a human should decide the concurrency target and test to it before exposing the service to real traffic.
- **Only the currently resolved dependency version (5.3.0) was exercised.** No version matrix or upgrade path has been tested, so the effect of a different 5.x release on either route is unknown.

# 4. Runtime Validation & UI Verification

- ✅ **Dependency provisioning** — installed from a tree with no dependencies present; Express 5.3.0 resolved inside this checkout and served both routes; no repository-root lockfile; advisory audit reported none.
- ✅ **`GET /` end to end** — 200, `text/plain; charset=utf-8`, `Content-Length: 14`, body `48 65 6c 6c 6f 2c 20 57 6f 72 6c 64 21 0a`, byte-identical across repeated, pipelined and 40 concurrent requests.
- ✅ **`GET /good-evening` end to end** — 200, the same media type, `Content-Length: 13`, body `47 6f 6f 64 20 65 76 65 6e 69 6e 67 0a`, byte-identical across the same runs.
- ✅ **Browser rendering of both routes** — each renders as a single plain-text line, 14 and 13 characters, document type `text/plain`, with 0 JavaScript errors and no page script.
- ✅ **Process startup and listener** — started with `node app.js` from the repository root; exactly one LISTEN socket on port 3000 held by that process; no `PORT`, `HOST` or `NODE_ENV` in its environment; 0 bytes written to its output.
- ✅ **Restart and port release** — the process stopped by its own pid, the port released, and a fresh start served the same byte-exact contract.
- ✅ **Hostile-input and credential probes** — injection, traversal, credential and cross-origin probes left both responses byte-identical, issued no cookie, added no CORS header and disclosed no internals.
- ⚠ Partial — **Routing surface for inputs the contract does not fix**: unregistered paths and unknown methods answer the stock 404 (not a 405), and path matching tolerates case and trailing or doubled slashes. These are the framework's defaults for inputs the specification leaves unspecified, documented rather than configured.
- ⚠ Partial — **Operational surface**: nothing probes the service and the process writes no log output, so liveness can only be inferred from the two routes; there is no readiness endpoint and no exit monitoring.
- ❌ Failing — **none observed**: no endpoint, flow, screen or integration failed at any point.

Never exercised at runtime: the deployment path (no container image, service supervisor, reverse proxy or TLS terminator exists or has been run — the service has only ever been started directly from the checkout), load or performance measurement, and multi-instance operation on one host. Absent by design, and therefore nothing to drive: a user interface beyond plain-text rendering, authentication, sessions or identity of any kind, a data store, any external integration, and any background or scheduled work.

# 5. Compliance & Quality Review

## 5.1 Compliance Matrix

| # | Deliverable / Requirement | Verified Status | Evidence |
|---|---------------------------|-----------------|----------|
| 1 | Express is the sole new dependency; no other package added, changed or removed | ✅ PASS | `package.json:1` — one dependency entry; installed tree holds Express and its own transitive packages only |
| 2 | `GET /` contract: 200, `text/plain`, 14-byte LF-terminated body | ✅ PASS | `app.js:2`; body `48 65 6c 6c 6f 2c 20 57 6f 72 6c 64 21 0a`, media type asserted by the handler |
| 3 | `GET /good-evening` contract: 200, `text/plain`, 13-byte LF-terminated body | ✅ PASS | `app.js:3`; body `47 6f 6f 64 20 65 76 65 6e 69 6e 67 0a`, media type asserted by the handler |
| 4 | Both routes served: one bound listener, neither registration dead | ✅ PASS | `app.js:4`; one LISTEN socket on port 3000 answered both routes in the same process |
| 5 | Manifest carries only `name`, `version` and the dependency in use | ✅ PASS | `package.json:1` — exactly three keys, no `engines`, `scripts`, `main`, `license` or other field |
| 6 | Install leaves the repository-root lockfile unwritten and the manifest unrewritten | ✅ PASS | No lockfile in the tree or history after repeated installs; manifest byte-identical to its committed blob |
| 7 | No test file or suite, and no change to `README.md`, `.gitignore` or other documentation | ✅ PASS | Zero test artefacts in tree or history; `README.md` blob unchanged; no `.gitignore` exists |
| 8 | No 404 handler, error handler, environment configuration or unrequested hardening | ✅ PASS | Empty scans for `app.use`, `process.env`, `res.status`, `next(`, `try`/`catch` and hardening middleware |
| 9 | Source in its most line-compact form, with no comments or docstrings | ✅ PASS | `app.js` four lines (47/71/82/17 characters), `package.json` one line (97 characters), zero comment markers |
| 10 | Scope containment: two paths added, nothing modified or deleted, submodule untouched | ✅ PASS | `git diff --name-status` adds only the two files; submodule pin `0664094` unchanged |
| 11 | Syntax gate and dependency audit clean | ✅ PASS | `node --check app.js` exit 0; advisory audit of the declared dependency reports none |
| 12 | Runtime serving of both contracts | ✅ PASS | Both routes answered 200 with byte-exact bodies over HTTP, over raw and framed sockets, and in a browser |

## 5.2 AAP & Rule Divergences and Gaps

| What the AAP / Rule Required | What Was Delivered Instead | Why It Diverged | Impact | Remediation |
|---|---|---|---|---|
| The request's constraint: do not independently research or verify dependency versions or framework behaviour — assume the latest stable major. **Sanctioned** | `express` declared as `^5.0.0` and left unverified and unpinned, with no lockfile recording the resolved tree (`package.json:1`) | The user's own instruction supersedes ordinary dependency hygiene: the range stands as a labelled assumption and no registry, advisory or version check was performed | Two installs of this commit can resolve different 5.x releases, and no advisory check exists for the line in use | Verify the resolved version and its advisories and decide the pinning policy — 2h (1.6 item 1) |
| A per-file static quality gate on the changed source. **Sanctioned** | Only `node --check app.js` (exit 0) plus manual reading; the repository defines no linter, formatter or style configuration | The request confines the change to two files, forbids an additional dependency and requires the most line-compact form; adding tooling would breach those constraints, and nothing existed to run | Style, unused-code and similar defects in future edits rest on review alone | No change to the deliverable is required; an external gate is the cheapest place to start (1.6 item 5) |
| The request fixes exactly two `GET` contracts and adds no handlers, no environment configuration and no hardening; the plan states framework-default behaviour governs every unspecified input. **Sanctioned** | Framework defaults retained: `OPTIONS` answers 200 with `Allow: GET, HEAD`; `/Good-Evening`, `/good-evening/` and `//` serve the contract; a conditional `GET` answers 304 with an empty body; non-GET methods answer 404 rather than 405; a second instance on the occupied port exits 1 | Retaining the defaults is what the request's exclusions require — a 405 handler, strict routing options or extra middleware are all changes it forbids | A consumer expecting a strict REST surface may mis-handle a 404 where it expects 405, or a 304 where it expects 200 | Document the exposed defaults in the deployment runbook and settle the posture — 2h (1.6 item 3) |

The manifest declares Express at `^5.0.0`, and nothing in the repository pins or verifies it (`package.json:1`). The install is run with `--no-package-lock`, so no repository-root lockfile records the resolved tree and two installs of the same commit can resolve different 5.x releases. That is exactly what the request asked for — it forbids independent research or verification of dependency versions and framework behaviour, and it requires the smallest possible diff and a three-field manifest — so the departure is from ordinary dependency hygiene rather than from the instruction. The consequence lands on the release owner: check the resolved version against advisory data, record it in the deployment metadata, and decide whether the deployment layer pins it. Two hours covers it.

The repository defines no linter, formatter, type checker or style configuration, and the request confines the change to two files, forbids an additional dependency and requires the changed code in its most line-compact form; introducing tooling would breach those constraints, so the strongest static gate applied to the delivered file is `node --check app.js` (exit 0) alongside manual reading. The departure is from the usual per-change static-quality gate, and it is sanctioned by the request's own exclusions. Nothing in the deliverable needs fixing. The reader should know what it costs: style drift, unused code and similar defects in future edits rest on review alone unless a gate is adopted at repository level, and the external gate recommended in 1.6 is the cheapest route to one.

The request fixes exactly two `GET` contracts and forbids extra routes, error handlers, environment configuration and hardening, so everything else behaves as the framework's default. `OPTIONS` on a registered path answers 200 with `Allow: GET, HEAD`; `/Good-Evening`, `/good-evening/` and `//` all serve the contract because matching is case-insensitive and non-strict; a conditional `GET` carrying a matching validator answers 304 with an empty body; `POST`, `PUT` and `DELETE` on a registered path answer 404 rather than 405; and a second instance on the occupied port exits 1 with an `EADDRINUSE` diagnostic on its own stderr. That behaviour is sanctioned by the request's exclusions, but it is not what a strict REST consumer expects — document it in the runbook and settle the posture, two hours.

Otherwise the delivery followed the plan without departure: both files are byte-identical to the content the plan fixes, exactly the two planned paths were created with nothing modified or deleted, and every constraint the request states — the manifest field set, the suppressed lockfile, the absent tests and documentation changes, the excluded handlers and hardening, and the line-compact form — was verified against the delivered bytes.

# 6. Risk Assessment

| Risk | Category | Severity | Probability | Mitigation | Status |
|---|---|---|---|---|---|
| The dependency is neither pinned nor verified: `express ^5.0.0` with no lockfile, so a future 5.x release changes the installed tree under the same manifest and a transitive problem could arrive silently | Integration / Security | Medium | Likely | Verify the resolved version and its advisories at deploy time and record the resolved version in the deployment metadata | Open — 2h carried in 2.2 item 1 |
| The listener binds every interface on a fixed port with no TLS, no rate limiting, no CORS policy and no security headers beyond the framework's own error-page headers | Security | Medium | Possible | Terminate TLS and rate limiting at a proxy or firewall, and decide the bind interface at deployment | Accepted by the request's no-hardening constraint — covered by 2.2 item 3 |
| A bind failure terminates the process: there is no error listener, so an occupied port ends the process with a non-zero exit and restart orchestration is the only remedy | Operational | Medium | Possible | Supervise the process, capture its output and alert on non-zero exit rather than relying on it to recover | Accepted by design — covered by 2.2 items 2 and 4 |
| A future edit to either handler or an upgrade of the dependency is unguarded: the repository configures no test suite, linter or CI gate | Technical | Medium | Possible | Add an external CI job that re-runs the byte-exact route assertions and the dependency audit outside the repository | Open — 1h carried in 2.2 item 5 |
| No graceful shutdown: `SIGTERM` and `SIGINT` end the process without draining in-flight requests, so a restart cuts whatever is in flight | Operational | Low | Certain on every restart | Restart outside traffic windows, or accept a brief interruption per restart | Accepted by design — covered by 2.2 item 3 |
| No request or header timeouts: an incomplete request head holds a connection for roughly 74 seconds, leaving slow-client resource pressure unmitigated | Operational / Security | Low | Possible | Enforce header and request timeouts at the proxy in front of the service | Accepted by design — covered by 2.2 item 3 |
| Permissive routing surface: matching tolerates case and trailing or doubled slashes, unknown methods answer 404 rather than 405, and a conditional `GET` answers 304 with an empty body, so clients doing method discovery or exact-path matching may mis-handle responses | Technical | Low | Likely for method-discovery or exact-path clients | Document the exposed defaults in the deployment runbook so consumers do not depend on a 405, on exact-case paths or on a 200 for a conditional request | Open — covered by 2.2 item 3 |

# 7. Visual Project Status

Project hours split between completed work (Dark Blue #5B39F3) and remaining work (White #FFFFFF).

```mermaid
%%{init: {"themeVariables": {"pie1": "#5B39F3", "pie2": "#FFFFFF", "pieOuterStrokeColor": "#B23AF2", "pieTitleTextColor": "#B23AF2", "pieSectionTextColor": "#111111"}}}%%
pie title Project Hours Breakdown
    "Completed Work" : 19
    "Remaining Work" : 8
```

**Completion: 19 of 27 hours — 70.4%.**

**Remaining Hours by Category**

| Category | Hours | Share of Remaining |
|----------|-------|--------------------|
| Dependency verification and version-pinning decision | 2 | 25.0% |
| Deployment artifact and runtime pinning | 2 | 25.0% |
| Network and process posture decision | 2 | 25.0% |
| Operational readiness definition | 1 | 12.5% |
| External regression gate | 1 | 12.5% |
| **Total** | **8** | **100%** |

**Priority Distribution of Remaining Work**

| Priority | Hours | Items |
|----------|-------|-------|
| High | 4 | Dependency verification and pinning; deployment artifact and runtime pinning |
| Medium | 3 | Network and process posture; operational readiness |
| Low | 1 | External regression gate |
| **Total** | **8** | 5 items |

# 8. Summary & Recommendations

The repository now serves two public endpoints from one Node.js process: `GET /` returns `Hello, World!` and `GET /good-evening` returns `Good evening`, both as 200 responses with the `text/plain` media type and byte-exact bodies terminated by a single LF. Express is the project's only dependency, declared in a three-field manifest, resolving to `express@5.3.0` from this checkout, installed without writing a repository-root lockfile. The change is additive: two files created, five lines added, no existing file modified or deleted, and the gitlink-pinned submodule untouched. All 18 tracked requirements of the requested scope are complete; 19 of the 27 hours the project spans are done, giving a completion of 19 ÷ 27 = 70.4%, with the remaining 8 hours being productionization rather than feature work.

Everything in the requested scope was exercised rather than merely read. Both routes were driven over HTTP with independent clients and in a real browser, confirming status, media type, content length and the exact bytes; the listener was proven to be a single socket on port 3000 held by the one process, taken from code with nothing read from the environment; the service was stopped and restarted and served the same contract; and 40 concurrent requests, pipelined requests and repeated calls all returned byte-identical responses. Thirty-three checks across eight areas passed with no failure, hostile-input probes — injection, traversal, credential, malformed and oversized protocol traffic — left both responses byte-identical, and the advisory audit of the declared dependency reported none.

The critical path to production is short and entirely outside the two route contracts. First, verify the resolved dependency version and decide how builds are pinned, because the manifest's `^5.0.0` range was deliberately left unverified and no lockfile records the installed tree. Second, produce the deployment artifact — packaging, a Node major-22 pin, service supervision and a restart policy — since the service currently runs only from a checkout, and a bind failure simply ends the process. Third, settle the network and process posture: bind interface and exposure, bind-failure handling, request and header timeouts, shutdown behaviour, and a runbook note for the framework defaults the service exposes (`OPTIONS` answering 200, case-insensitive and trailing-slash matching, a conditional `GET` answering 304, and 404 rather than 405 for unknown methods). Fourth, define operational readiness: a probe against the two routes, capture of process output, and an alert on non-zero exit, because the process logs nothing. Those four items plus the external regression gate account for the 8 remaining hours, of which 4 are High priority.

Production readiness: ready to deliver against the stated contract, and not hardened for open-network exposure — by design. The two contracts are implemented exactly as specified and verified to the byte, no payload executes or is reflected, no credential or token appears in any response or in the process output, and the dependency line carries no reported advisories. What the request intentionally excluded is what a deployment owner must now decide consciously: no lockfile, no hardening, no deployment descriptor, no test suite. The recommended route is to keep the deliverable as it is — it satisfies the request precisely — and carry the Open and Accepted risks recorded in Section 6 into the deployment pipeline as gates, re-running the two route assertions and the dependency audit on every build so the 33 checks recorded here become a gate rather than a snapshot.

# 9. Development Guide

### System Prerequisites

- **Node.js major 22** (verified on v22.23.4) and the bundled npm (verified on 11.21.0); run `node --version` and `npm --version` to confirm.
- **No database, cache, broker or external service**, and no container runtime is needed. The project reads no environment variable and no secret.
- **curl and od** for the verification steps below (`od` ships with coreutils and is optional if you prefer another byte dump).
- **One free TCP port: 3000.** The port is a code constant, not configuration.

### Environment Setup

There is nothing to configure: the service reads no environment variable, no configuration file and no credential, and the repository intentionally carries neither a `.gitignore` nor a version file. Work from the repository root.

```bash
cd <repository-root>
node --version   # expect v22.x
npm --version    # expect 11.x
```

### Dependency Installation

```bash
# from the repository root
npm install --no-package-lock
```

This resolves the manifest's `^5.0.0` and installs Express plus its own transitive packages into `node_modules` — 65 packages in the verified run — and writes no repository-root lockfile. Confirm what was installed:

```bash
npm ls --depth=0        # expect: parent_repo_hello_world_ABK_6771@1.0.0  └── express@5.3.0
```

`node_modules` is install output and must never be committed, and neither must a lockfile: the project is deliberately lockfile-free, so if you add files to a commit, name them explicitly (`git add app.js package.json`) rather than using `git add -A`.

To check the dependency line for advisories without adding a lockfile to the repository, run npm in a scratch copy of the manifest kept outside the checkout:

```bash
mkdir -p "$HOME/dep-audit" && cp package.json "$HOME/dep-audit/"
cd "$HOME/dep-audit" && npm install --package-lock-only && npm audit --audit-level=high
```

### Application Startup

```bash
# from the repository root — there is no build step and no npm script
node app.js
```

The process logs nothing, prints nothing and holds port 3000 exclusively. Run it in the background when you need the shell back, keeping its pid so you can stop it later:

```bash
nohup node app.js > "$HOME/hello-service.log" 2>&1 &
echo $!                                  # record the pid
for i in $(seq 1 50); do curl -s -o /dev/null http://127.0.0.1:3000/ && break; sleep 0.2; done
```

Poll for readiness rather than sleeping — the process is up as soon as the first request answers.

### Verification Steps

```bash
# headers and status for both routes
curl -sS -D - -o /dev/null http://127.0.0.1:3000/
curl -sS -D - -o /dev/null http://127.0.0.1:3000/good-evening

# exact response bytes (expect 48 65 6c 6c 6f 2c 20 57 6f 72 6c 64 21 0a, 14 bytes)
curl -s http://127.0.0.1:3000/ | od -An -tx1

# exact response bytes (expect 47 6f 6f 64 20 65 76 65 6e 69 6e 67 0a, 13 bytes)
curl -s http://127.0.0.1:3000/good-evening | od -An -tx1
```

Copy-pasteable gate — every line must print `OK`:

```bash
test "$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3000/)" = 200 && echo "root status OK"
test "$(curl -s http://127.0.0.1:3000/ | od -An -tx1 | tr -d ' \n')" = 48656c6c6f2c20576f726c64210a && echo "root body OK"
test "$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3000/good-evening)" = 200 && echo "good-evening status OK"
test "$(curl -s http://127.0.0.1:3000/good-evening | od -An -tx1 | tr -d ' \n')" = 476f6f64206576656e696e670a && echo "good-evening body OK"
```

A purely syntactic change can be checked without starting anything:

```bash
node --check app.js
```

Stop the service by the pid you recorded:

```bash
kill <pid>
```

### Example Usage

```bash
$ curl -sS -D - http://127.0.0.1:3000/
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/plain; charset=utf-8
Content-Length: 14
ETag: W/"e-YP3pwjELDUytTauNEmsEOH77ook"
Connection: keep-alive
Keep-Alive: timeout=5

Hello, World!

$ curl -s http://127.0.0.1:3000/good-evening
Good evening

$ curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/anything-else
404
```

Any HTTP client works, including a browser: both routes render as a single plain-text line, and `document.contentType` is `text/plain`.

### Troubleshooting

| Symptom | Cause | Resolution |
|---------|-------|------------|
| `Error: listen EADDRINUSE: address already in use :::3000` and the process exits 1 | Port 3000 is already held, most likely by another instance of this service | Stop the process holding the port (`kill <pid>`) before starting a new one; the port cannot be changed from the environment because it is a code constant |
| `Cannot find module 'express'` | Dependencies are not installed in this checkout | Run `npm install --no-package-lock` from the repository root |
| An unexpected path or method answers 404 | Only the two registered `GET` routes exist; everything else falls through to the framework's stock 404, and there is no 405 handling | Use `GET /` or `GET /good-evening`; treat any other status as the framework default rather than a fault |
| A request returns 304 with an empty body | The response carries a weak validator, and your request sent a matching conditional header | Re-issue the request unconditionally (no `If-None-Match` / `If-Modified-Since`) |
| `/Good-Evening` or `/good-evening/` answers 200 as well as the exact path | Path matching is case-insensitive and non-strict by framework default | Treat the exact lower-case path as the contract and do not build client logic on the variants |
| Nothing appears in the terminal while the service runs | The application writes no log output by design; its stdout/stderr are empty unless a fatal bind error occurs | Judge liveness by calling `GET /`; capture the process output only to see startup failures |
| No lint, format or test command exists | The project intentionally carries no test files, no linter and no CI configuration | Use `node --check app.js` plus the gate above; adopt an external gate if you want these checks enforced automatically |

# 10. Appendices

### A. Command Reference

| Purpose | Command (from the repository root) |
|---------|------------------------------------|
| Check the runtime | `node --version`, `npm --version` |
| Install the dependency | `npm install --no-package-lock` |
| List the installed top-level packages | `npm ls --depth=0` |
| Syntax-check the application file | `node --check app.js` |
| Start the service | `node app.js` |
| Start it in the background and record the pid | `nohup node app.js > "$HOME/hello-service.log" 2>&1 &` then `echo $!` |
| Poll for readiness | `for i in $(seq 1 50); do curl -s -o /dev/null http://127.0.0.1:3000/ && break; sleep 0.2; done` |
| Show response headers | `curl -sS -D - -o /dev/null http://127.0.0.1:3000/` |
| Show exact response bytes | `curl -s http://127.0.0.1:3000/ \| od -An -tx1` |
| Assert the full contract | the four `test` lines in Section 9 |
| Audit the dependency without a lockfile | `mkdir -p "$HOME/dep-audit" && cp package.json "$HOME/dep-audit/" && cd "$HOME/dep-audit" && npm install --package-lock-only && npm audit --audit-level=high` |
| Stop the service | `kill <pid>` |

### B. Port Reference

| Port | Owner | Notes |
|------|-------|-------|
| 3000 | This service, exclusively | Fixed in code in `app.js`; it is not read from an environment variable or a configuration file. One instance per host: a second instance fails to bind and exits 1. No other port is opened, and there is no health, metrics or administration port. |

### C. Key File Locations

| Path | Purpose |
|------|---------|
| `app.js` | The whole application: one Express instance, the `GET /` and `GET /good-evening` registrations, and the listener on port 3000 |
| `package.json` | The manifest: `name`, `version` and the single `express` dependency |
| `README.md` | The repository's own title line, which supplies the manifest's `name`; unchanged by this work |
| `hello.go`, `hello.php`, `hello.rb` | Pre-existing standalone hello-world programs in other languages; unrelated to the service and unchanged |
| `submodule_repo_child_level_1/` | A gitlink-pinned separate repository (`hello.java`, `hello.js`, `hello.py`); unchanged, and not part of the service |
| `node_modules/` | Install output, produced by `npm install`; never committed |
| `.gitmodules` | Declares the pinned submodule; unchanged |

### D. Technology Versions

| Component | Version | Notes |
|-----------|---------|-------|
| Node.js | v22.23.4 | Major 22 is the runtime the project assumes; no version file and no `engines` field pins it |
| npm | 11.21.0 | Used for install, listing and the out-of-tree audit |
| Express | resolved to 5.3.0 | Declared as `^5.0.0`, unverified by instruction, and unrecorded by any lockfile |
| Installed package count | 65 | Express plus its own transitive dependencies; nothing else is declared |
| HTTP protocol | HTTP/1.1 | Both routes answered HTTP/1.1 and HTTP/1.0 requests; keep-alive is offered with a 5-second timeout |

### E. Environment Variable Reference

**None.** The service reads no environment variable: the port is a code constant (`app.js`), there is no `NODE_ENV` branch, no configuration file and no secret. Setting `PORT` has no effect. The only environment facts that matter are the Node major version and a free port 3000.

### G. Glossary

| Term | Meaning here |
|------|--------------|
| AAP-scoped work | The work the project's plan defined as its deliverables: the two routes, the manifest, and the constraints around them |
| Byte-exact | The response body matches the specified bytes one for one, including the single trailing LF and with no extra whitespace |
| LF | Line feed, byte `0x0A`; the final byte of both response bodies |
| Listener | The socket opened by `app.listen(3000)`; exactly one exists per running instance |
| Dead registration | A route registered on an object that never serves traffic; neither route is one, because both hang off the instance that listens |
| Path-to-production work | The deployment-side work still outstanding: dependency verification and pinning, the deployment artifact, network and process posture, operational readiness, and an external regression gate |
| Stock 404 | The framework's built-in `Cannot GET <path>` page, returned for any path or method that is not one of the two registered routes |
| Conditional request | A request carrying a validator such as `If-None-Match`; the framework answers 304 with an empty body when it matches |
| Sanctioned | Required or permitted by the request's own constraints, even where it departs from ordinary practice |
