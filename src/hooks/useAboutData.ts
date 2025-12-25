import { useCollection } from './useCollection';
import { Education, Experience } from '@/lib/types';

export function useAboutData() {
     const { data: educations, loading: loadingEducations } = useCollection<Education>('educations');
     const { data: experiences, loading: loadingExperiences } = useCollection<Experience>('experiences');

     return {
          educations,
          experiences,
          loading: loadingEducations || loadingExperiences
     };
}
