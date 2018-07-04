'use strict';
// TIP: related -> CodeFalling/hexo-asset-image

var cheerio = require('cheerio');
hexo.extend.filter.register('after_post_render', function (data) {
	var config = hexo.config;
	if (config.post_asset_folder) {
		var link = data.permalink;
		var get_position = (str, m, i) => str.split(m, i).join(m).length;
		var get_assets = assets => {
			var paths = assets.split('/').filter(elem => elem != '' && elem != '.');
			if (paths.length >= 2) {
				if (paths[0] == prefix) {
					paths.shift();
					return paths.join('/');
				}
			}
			return false;
		}

		var begin_pos = get_position(link, '/', 3) + 1;
		var end_pos = link.lastIndexOf('/') + 1;
		link = link.substring(begin_pos, end_pos);
		var toprocess = ['excerpt', 'more', 'content'];

		for (var i = 0; i < toprocess.length; i++) {
			var key = toprocess[i];
			var $ = cheerio.load(data[key], {
				ignoreWhitespace: false,
				xmlMode: false,
				lowerCaseTags: false,
				decodeEntities: false
			});
			var prefix = data['source'].replace(/(.+\/)?([^\/]+)\.md$/, '$2');
			$('img').each(function () {
				if ($(this).attr('src')) {
					var attr = 'src';
					if ($(this).attr('data-src')) {
						attr = 'data-src';
					}
					var src = $(this).attr(attr).replace('\\', '/');
					if (!/https?\:\/\//.test(src) && !/^\#/.test(src)) {
						var dest = get_assets(src);
						if (dest) {
							$(this).attr(attr, dest);
							// console.info('image src ' + src + " --> " + dest);
						}
					}
				}
			});
			$('a').each(function () {
				if ($(this).attr('href')) {
					var src = $(this).attr('href').replace('\\', '/');
					if (!/https?\:\/\//.test(src) && !/^\#/.test(src)) {
						var dest = get_assets(src);
						if (dest) {
							$(this).attr('href', dest);
							// console.info('link href ' + src + " --> " + dest);
						}
					}
				}
			});
			data[key] = $.html();
		}
	}
});