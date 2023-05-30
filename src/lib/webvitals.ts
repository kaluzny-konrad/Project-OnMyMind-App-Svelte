import type { Metric } from 'web-vitals';
import { onCLS, onFCP, onFID, onLCP, onTTFB } from 'web-vitals';

type AnalyticsOptions = {
	params: Record<string, string>;
	path: string;
	analyticsId: string;
	debug?: true;
};

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

function getConnectionSpeed(): string {
	if ('connection' in navigator) {
		if (navigator['connection']) {
			const connection = navigator['connection'] as any;
			if ('effectiveType' in connection) {
				return connection['effectiveType'];
			}
		}
	}
	return '';
}

function sendToAnalytics(metric: Metric, options: AnalyticsOptions) {
	const page = Object.entries(options.params).reduce(
		(acc, [key, value]) => acc.replace(value, `[${key}]`),
		options.path,
	);

	const body = {
		dsn: options.analyticsId,
		id: metric.id,
		page,
		href: location.href,
		event_name: metric.name,
		value: metric.value.toString(),
		speed: getConnectionSpeed(),
	};

	if (options.debug) {
		console.log('[Analytics]', metric.name, JSON.stringify(body, null, 2));
	}

	const blob = new Blob([new URLSearchParams(body).toString()], {
		// This content type is necessary for `sendBeacon`:
		type: 'application/x-www-form-urlencoded',
	});
	fetch(vitalsUrl, {
		body: blob,
		method: 'POST',
		credentials: 'omit',
		keepalive: true,
	});
}

export function webVitals(options: AnalyticsOptions): void {
	try {
		onFID((metric: Metric) => sendToAnalytics(metric, options));
		onTTFB((metric: Metric) => sendToAnalytics(metric, options));
		onLCP((metric: Metric) => sendToAnalytics(metric, options));
		onCLS((metric: Metric) => sendToAnalytics(metric, options));
		onFCP((metric: Metric) => sendToAnalytics(metric, options));
	} catch (err) {
		console.error('[Analytics]', err);
	}
}
