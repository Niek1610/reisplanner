export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","style.css"]),
	mimeTypes: {".png":"image/png",".css":"text/css"},
	_: {
		client: {"start":"_app/immutable/entry/start.-5BJOO4P.js","app":"_app/immutable/entry/app.CwvEYyg3.js","imports":["_app/immutable/entry/start.-5BJOO4P.js","_app/immutable/chunks/entry.CqcZZdrt.js","_app/immutable/chunks/scheduler.CoCxny8d.js","_app/immutable/chunks/index.CgW3eOSd.js","_app/immutable/entry/app.CwvEYyg3.js","_app/immutable/chunks/scheduler.CoCxny8d.js","_app/immutable/chunks/index.B5RvqOIF.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/homepage",
				pattern: /^\/homepage\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: __memo(() => import('../output/server/entries/endpoints/homepage/_server.js'))
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
