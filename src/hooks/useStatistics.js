import { useQuery } from '@tanstack/react-query';
import { 
  DelovniTendenciiService, 
  EkonomskiSmetkiService, 
  ZdravstveniSmetkiService, 
  PoloviStatistikiService,
  ProstorniEdiniciService
} from '@services/statistics';

/**
 * Generic hook for fetching statistics data
 * 
 * @param {Array} queryKey - Cache key for React Query
 * @param {Function} fetchFunction - Function to fetch data
 * @returns {Object} - Query result with normalized data format
 */
export const useStatistics = (queryKey, fetchFunction) => {
  return useQuery({
    queryKey: queryKey,
    queryFn: fetchFunction,
    select: (data) => {
      if (!data) return { 
        data: [], 
        columns: [], 
        years: [], 
        regions: [], 
        periods: [],
        vozrasniGrupi: [],
        genders: [],
        functions: [],
        schemes: [],
        providers: [],
        categories: []
      };
      
      return {
        data: data.data || [],
        columns: data.columns || [],
        years: data.years || [],
        regions: data.regions || [],
        periods: data.periods || [],
        vozrasniGrupi: data.vozrasniGrupi || [],
        genders: data.genders || [],
        functions: data.functions || [],
        schemes: data.schemes || [],
        providers: data.providers || [],
        categories: data.categories || []
      };
    },
    onError: (error) => {
      console.error('Error fetching data:', error);
    }
  });
};

// Delovni Tendencii hooks
export const useGradeznistvo = () => {
  return useStatistics(['gradeznistvo'], () => DelovniTendenciiService.getGradeznistvo());
};

export const usePrerabotuvackaIndustrija = () => {
  return useStatistics(['prerabotuvackaIndustrija'], () => DelovniTendenciiService.getPrerabotuvackaIndustrija());
};

export const useTrgovija = () => {
  return useStatistics(['trgovija'], () => DelovniTendenciiService.getTrgovija());
};

// Ekonomski Smetki hooks
export const useEkonomskiSmetkiTekovni = () => {
  return useStatistics(['ekonomskiSmetkiTekovni'], () => EkonomskiSmetkiService.getEkonomskiSmetkiTekovni());
};

export const useEkonomskiSmetkiPostojani = () => {
  return useStatistics(['ekonomskiSmetkiPostojani'], () => EkonomskiSmetkiService.getEkonomskiSmetkiPostojani());
};

export const useEkonomskiSmetkiRegionalni = () => {
  return useStatistics(['ekonomskiSmetkiRegionalni'], () => EkonomskiSmetkiService.getEkonomskiSmetkiRegionalni());
};

// Zdravstveni Smetki hooks
export const useZdravstveniSmetki = () => {
  return useStatistics(['zdravstveniSmetki'], () => ZdravstveniSmetkiService.getZdravstveniFunkciiDavateli());
};

export const useZdravstveniFunkciiShemi = () => {
  return useStatistics(['zdravstveniFunkciiShemi'], () => ZdravstveniSmetkiService.getZdravstveniFunkciiShemi());
};

export const useZdravstveniFunkciiDavateli = () => {
  return useStatistics(['zdravstveniFunkciiDavateli'], () => ZdravstveniSmetkiService.getZdravstveniFunkciiDavateli());
};

export const useZdravstveniDavateliShemi = () => {
  return useStatistics(['zdravstveniDavateliShemi'], () => ZdravstveniSmetkiService.getZdravstveniDavateliShemi());
};

// Polovi Statistiki hooks
export const usePoloviStatistiki = () => {
  return useStatistics(['poloviStatistiki'], () => PoloviStatistikiService.getPoloviStatistikiPokazateli());
};

export const usePoloviStatistikiPokazateli = () => {
  return useStatistics(['poloviStatistikiPokazateli'], () => PoloviStatistikiService.getPoloviStatistikiPokazateli());
};

export const usePoloviStatistikiZrtviNasilstvo = () => {
  return useStatistics(['poloviStatistikiZrtviNasilstvo'], () => PoloviStatistikiService.getPoloviStatistikiZrtviNasilstvo());
};

// Prostorni Edinici hooks
export const useProstorniEdinici = () => {
  return useStatistics(['prostorniEdinici'], () => ProstorniEdiniciService.getProstorniEdiniciOpstiniNaseleniMesta());
};

export const useProstorniEdiniciOpstiniNaseleniMesta = () => {
  return useStatistics(['prostorniEdiniciOpstiniNaseleniMesta'], () => ProstorniEdiniciService.getProstorniEdiniciOpstiniNaseleniMesta());
}; 