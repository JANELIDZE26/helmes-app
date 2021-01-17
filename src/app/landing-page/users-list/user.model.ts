import { Organization, Repos } from '../../services/api/api.service';

export interface User {
  avatar_url: string;
  html_url: string;
  organizations_url: string;
  login: string;
  type: string;
  id: string;
  repos?: Repos[];
  repos_url?: string;
  organizations?: Organization[];
}
