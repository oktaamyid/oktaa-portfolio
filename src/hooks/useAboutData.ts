import { useCollection } from './useCollection';
import { Education, Experience } from '@/lib/types';

export function useAboutData() {
     const { data: educations, loading: loadingEducations } = useCollection<Education>('education');
     const { data: experiences, loading: loadingExperiences } = useCollection<Experience>('experience');

     return {
          educations,
          experiences,
          loading: loadingEducations || loadingExperiences
     };
}
