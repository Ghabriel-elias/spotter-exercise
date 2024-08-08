import { useHomeModel } from './model';
import { HomeView } from './view';

export const Home = () => {

  const homeModel = useHomeModel()

  return (
    <HomeView {...homeModel}/>
  )
}