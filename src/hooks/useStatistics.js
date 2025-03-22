import { useQuery } from '@tanstack/react-query';
import statisticsService from '../services/StatisticsService';

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

// Pre-defined query hooks for each statistic type
export const useGradeznistvo = () => {
  return useStatistics(['gradeznistvo'], () => statisticsService.getGradeznistvo());
};

export const usePrerabotuvackaIndustrija = () => {
  return useStatistics(['prerabotuvackaIndustrija'], () => statisticsService.getPrerabotuvackaIndustrija());
};

export const useTrgovija = () => {
  return useStatistics(['trgovija'], () => statisticsService.getTrgovija());
};

// Generic hooks for detail views
export const useZdravstveniSmetki = () => {
  return useStatistics(['zdravstveniSmetki'], () => statisticsService.getZdravstveniFunkciiDavateli());
};

export const usePoloviStatistiki = () => {
  return useStatistics(['poloviStatistiki'], () => statisticsService.getPoloviStatistikiPokazateli());
};

export const useProstorniEdinici = () => {
  return useStatistics(['prostorniEdinici'], () => statisticsService.getProstorniEdiniciOpstiniNaseleniMesta());
};

export const useEkonomskiSmetkiTekovni = () => {
  return useStatistics(['ekonomskiSmetkiTekovni'], () => statisticsService.getEkonomskiSmetkiTekovni());
};

export const useEkonomskiSmetkiPostojani = () => {
  return useStatistics(['ekonomskiSmetkiPostojani'], () => statisticsService.getEkonomskiSmetkiPostojani());
};

export const useEkonomskiSmetkiRegionalni = () => {
  return useStatistics(['ekonomskiSmetkiRegionalni'], () => statisticsService.getEkonomskiSmetkiRegionalni());
};

export const useZdravstveniFunkciiShemi = () => {
  return useStatistics(['zdravstveniFunkciiShemi'], () => statisticsService.getZdravstveniFunkciiShemi());
};

export const useZdravstveniFunkciiDavateli = () => {
  return useStatistics(['zdravstveniFunkciiDavateli'], () => statisticsService.getZdravstveniFunkciiDavateli());
};

export const useZdravstveniDavateliShemi = () => {
  return useStatistics(['zdravstveniDavateliShemi'], () => statisticsService.getZdravstveniDavateliShemi());
};

export const usePoloviStatistikiPokazateli = () => {
  return useStatistics(['poloviStatistikiPokazateli'], () => statisticsService.getPoloviStatistikiPokazateli());
};

export const usePoloviStatistikiZrtviNasilstvo = () => {
  return useStatistics(['poloviStatistikiZrtviNasilstvo'], () => statisticsService.getPoloviStatistikiZrtviNasilstvo());
};

export const useProstorniEdiniciOpstiniNaseleniMesta = () => {
  return useStatistics(['prostorniEdiniciOpstiniNaseleniMesta'], () => statisticsService.getProstorniEdiniciOpstiniNaseleniMesta());
}; 