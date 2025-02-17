export interface UserRankReq {
	q: string;
	sort?: string;
	order?: string;
	per_page?: number;
	page?: number;
	type?: string;
}

export interface UserData {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: string;
	site_admin: boolean;
	score: number;
	followers?: number;
	public_repos?: number;
	location?: string;
}

export interface UserRankResp {
	total_count: number;
	incomplete_results: boolean;
	items: UserData[];
}
