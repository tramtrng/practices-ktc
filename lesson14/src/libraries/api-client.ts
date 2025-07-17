import apiClientSimple from './api-client-simple';
import apiClientAdvanced from './api-client-advanced';

const mode: string = 'simple';

const apiClient = mode === 'advanced' ? apiClientAdvanced : apiClientSimple;

export { apiClient };