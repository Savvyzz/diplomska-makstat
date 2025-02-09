import { Link } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';

const Navbar = () => {
  const items = [
    {
      label: 'Градежништво',
      icon: 'pi pi-fw pi-building',
      url: '/gradeznistvo'
    },
    {
      label: 'Преработувачка индустрија',
      icon: 'pi pi-fw pi-cog',
      url: '/prerabotuvacka-industrija'
    },
    {
      label: 'Трговија',
      icon: 'pi pi-fw pi-shopping-cart',
      url: '/trgovija'
    },
    {
      label: 'Економски сметки',
      icon: 'pi pi-fw pi-chart-line',
      items: [
        {
          label: 'Тековни цени',
          url: '/ekonomski-smetki/tekovni-ceni'
        },
        {
          label: 'Постојани цени',
          url: '/ekonomski-smetki/postojani-ceni'
        },
        {
          label: 'Регионални сметки',
          url: '/ekonomski-smetki/regionalni-smetki'
        }
      ]
    }
  ];

  const start = <Link to="/" className="brand-logo">МакСтат</Link>;

  return (
    <Menubar 
      model={items} 
      start={start}
      className="mb-5"
    />
  );
};

export default Navbar; 