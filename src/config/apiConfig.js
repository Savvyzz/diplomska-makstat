export const API_BASE_URL = 'https://makstat.stat.gov.mk/PXWeb/api/v1/mk/MakStat';

export const ENDPOINTS = {
  GRADEZNISTVO: '/DelovniTend/125_DT_mk_DTG_mk.px',
  PRERABOTUVACKA_INDUSTRIJA: '/DelovniTend/175_DT_mk_DTPRInd_mk.px',
  TRGOVIJA: '/DelovniTend/225_DT_mk_DTT_mk.px'
};

export const API_RESPONSE_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500
}; 