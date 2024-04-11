import Registration from './components/Registration' ;
import Container from './global.module.css' ;
export default function HomePage() {
  return (
    <div className={Container.container}>
      <div className={Container.registration_container}>
        <Registration />
      </div>
    </div>
  );
     
}
  


