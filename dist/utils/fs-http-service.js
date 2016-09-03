var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "aurelia-fetch-client", "aurelia-event-aggregator", "./fs-application"], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1, aurelia_event_aggregator_1, fs_application_1) {
    "use strict";
    var FSHttpService = (function () {
        function FSHttpService(httpClient, appState, eventAggregator) {
            this.httpClient = httpClient;
            this.appState = appState;
            this.eventAggregator = eventAggregator;
            this.appState.info(this.constructor.name, 'Initialized');
            var self = this;
            httpClient.configure(function (config) {
                config
                    .withBaseUrl(appState.HttpConfig.BaseUrl)
                    .withInterceptor({
                    request: function (request) {
                        appState.info(self.constructor.name, "Requesting " + request.method + " " + request.url);
                        appState.IsHttpInUse = true;
                        return request;
                    },
                    response: function (response) {
                        appState.info(self.constructor.name, "Response " + response.status + " " + response.url);
                        appState.IsHttpInUse = false;
                        if (response instanceof TypeError) {
                            throw Error(response['message']);
                        }
                        if (response.status == 401) {
                            eventAggregator.publish('Unauthorized', null);
                        }
                        else if (response.status != 200) {
                            return response.text()
                                .then(function (resp) {
                                var json = {};
                                try {
                                    json = JSON.parse(resp);
                                }
                                catch (e) { }
                                if (json.message)
                                    throw Error(json.message);
                                if (json.error)
                                    throw Error(json.error);
                                if (response.statusText)
                                    throw Error(response.statusText);
                                if (!response.statusText)
                                    throw Error('Network Error!!');
                                return null;
                            });
                        }
                        return response;
                    },
                    requestError: function (error) {
                        appState.IsHttpInUse = false;
                        if (error !== null)
                            throw Error(error.message);
                        return error;
                    },
                    responseError: function (error) {
                        appState.IsHttpInUse = false;
                        if (error !== null)
                            throw Error(error.message);
                        return error;
                    }
                });
            });
        }
        FSHttpService.prototype.setBaseUrl = function (url) {
            this.httpClient.baseUrl = url;
        };
        FSHttpService.prototype.get = function (slug) {
            this.appState.info(this.constructor.name, "get [" + slug + "]");
            return this.httpClient
                .fetch(slug, {
                method: 'get',
                mode: 'cors',
                headers: this.__getHeaders()
            })
                .then(function (resp) { return resp.json(); });
        };
        FSHttpService.prototype.text = function (slug) {
            this.appState.info(this.constructor.name, "text [" + slug + "]");
            return this.httpClient
                .fetch(slug, {
                method: 'get',
                mode: 'cors',
                headers: this.__getHeaders()
            })
                .then(function (resp) { return resp.text(); });
        };
        FSHttpService.prototype.put = function (slug, obj) {
            this.appState.info(this.constructor.name, "put [" + slug + "]");
            return this.httpClient
                .fetch(slug, {
                method: 'put',
                body: aurelia_fetch_client_1.json(obj),
                mode: 'cors',
                headers: this.__getHeaders()
            })
                .then(function (resp) { return resp.json(); });
        };
        FSHttpService.prototype.post = function (slug, obj) {
            this.appState.info(this.constructor.name, "post [" + slug + "]");
            return this.httpClient
                .fetch(slug, {
                method: 'post',
                body: aurelia_fetch_client_1.json(obj),
                mode: 'cors',
                headers: this.__getHeaders()
            })
                .then(function (resp) { return resp.json(); });
        };
        FSHttpService.prototype.delete = function (slug) {
            this.appState.info(this.constructor.name, "delete [" + slug + "]");
            return this.httpClient
                .fetch(slug, {
                method: 'delete',
                mode: 'cors',
                headers: this.__getHeaders()
            })
                .then(function (resp) { return resp.json(); });
        };
        FSHttpService.prototype.__getHeaders = function () {
            var headers = {
                'X-Requested-With': 'Fetch',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
            };
            Object.assign(headers, this.appState.HttpConfig.Headers || {});
            if (this.appState.HttpConfig.AuthorizationHeader && !isEmpty(this.appState.AuthUser)) {
                var token = this.appState.AuthUser + ":" + this.appState.AuthToken;
                var hash = btoa(token);
                headers['Authorization'] = "Basic " + hash;
            }
            return headers;
        };
        FSHttpService = __decorate([
            aurelia_framework_1.autoinject(), 
            __metadata('design:paramtypes', [aurelia_fetch_client_1.HttpClient, fs_application_1.FSApplication, aurelia_event_aggregator_1.EventAggregator])
        ], FSHttpService);
        return FSHttpService;
    }());
    exports.FSHttpService = FSHttpService;
});
