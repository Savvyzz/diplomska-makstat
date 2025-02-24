export const API_BASE_URL = 'https://makstat.stat.gov.mk/PXWeb/api/v1/mk/MakStat';

export const ENDPOINTS = {
  GRADEZNISTVO: '/DelovniTend/125_DT_mk_DTG_mk.px',
  PRERABOTUVACKA_INDUSTRIJA: '/DelovniTend/175_DT_mk_DTPRInd_mk.px',
  TRGOVIJA: '/DelovniTend/225_DT_mk_DTT_mk.px',
  EKONOMSKI_SMETKI_TEKOVNI: '/EkSmetkiZem/125_SmetZem_Mk_TekCen_ml.px',
  EKONOMSKI_SMETKI_POSTOJANI: '/EkSmetkiZem/175_SmetZem_Mk_PostCen_ml.px',
  EKONOMSKI_SMETKI_REGIONALNI: '/EkSmetkiZem/200_Zem_reg_EAApro_ml.px',
  ZDRAVSTVENI_SMETKI_FUNKCII_SHEMI: '/ZdrastveniSmetki/125_NacSmM_Mk_HPxHF_ml.px',
  ZDRAVSTVENI_SMETKI_FUNKCII_DAVATELI: '/ZdrastveniSmetki/150_NacSmM_Mk_HPxHF_ml.px',
  ZDRAVSTVENI_SMETKI_DAVATELI_SHEMI: '/ZdrastveniSmetki/175_NacSmM_Mk_HPxHF_ml.px'
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