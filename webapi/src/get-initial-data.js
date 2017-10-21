var data = {
    customers: [
        {
            name: 'ovr',
            envs: [
                {
                    name: "live",
                    services: [
                        {
                            name: "site",
                            instances: [
                                {
                                    name: "www",
                                    status: "ok",
                                    check: {
                                        type: "http",
                                        opts: {
                                            url: "https://www.onevisionreport.com/version.json"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            name: "database",
                            instances: [
                                {
                                    name: "db",
                                    status: "ok",
                                    check: {
                                        type: "http",
                                        opts: {
                                            url: "https://www.onevisionreport.com/version.json"
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    name: "demo",
                    services: [
                        {
                            name: "site",
                            instances: [
                                {
                                    name: "demo",
                                    status: "ok",
                                    check: {
                                        type: "http",
                                        opts: {
                                            url: "https://demo.onevisionreport.com/version.json"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            name: "database",
                            instances: [
                                {
                                    name: "db",
                                    status: "ok",
                                    check: {
                                        type: "http",
                                        opts: {
                                            url: "https://www.onevisionreport.com/version.json"
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            name: 'arcusx',
            envs: [
                {
                    name: "live",
                    services: [
                        {
                            name: "trackroom2",
                            instances: [
                                {
                                    name: "trackroom2",
                                    status: "ok",
                                    check: {
                                        type: "http",
                                        opts: {
                                            url: "https://bugtracker.arcusx.com"
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            name: "database",
                            instances: [
                                {
                                    name: "db",
                                    status: "ok",
                                    check: {
                                        type: "http",
                                        opts: {
                                            url: "https://bugtracker.arcusx.com"
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }]
        },
        {
            name: 'group0',
            envs: [
                {
                    name: "live",
                    services: [
                        {
                            name: "registry",
                            instances: [
                                {
                                    name: "registry_0",
                                    status: "ok"
                                },
                                {
                                    name: "registry_1",
                                    status: "down"
                                },
                                {
                                    name: "registry_2",
                                    status: "ok"
                                }
                            ]
                        },
                        {
                            name: "database",
                            instances: [
                                {
                                    name: "db0",
                                    status: "ok"
                                },
                                {
                                    name: "db1",
                                    status: "down"
                                },
                                {
                                    name: "db2",
                                    status: "ok"
                                }
                            ]
                        }

                    ]
                },
                {
                    name: "stage",
                    services: [
                        {
                            name: "registry",
                            instances: [
                                {
                                    name: "registry_0",
                                    status: "ok"
                                },
                                {
                                    name: "registry_1",
                                    status: "down"
                                },
                                {
                                    name: "registry_2",
                                    status: "down"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}

module.exports = function getInitialData() {
    return JSON.parse(JSON.stringify(data));
};