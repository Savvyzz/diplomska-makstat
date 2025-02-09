import React from 'react';
import { Link } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';

const Navbar = () => {
  const items = [
    {
      label: 'Градежништво',
      icon: 'pi pi-home',
      url: '/gradeznistvo'
    },
    {
      label: 'Преработувачка индустрија',
      icon: 'pi pi-cog',
      url: '/prerabotuvacka-industrija'
    },
    {
      label: 'Трговија',
      icon: 'pi pi-shopping-cart',
      url: '/trgovija'
    },
    {
      label: 'Економски сметки',
      icon: 'pi pi-chart-line',
      items: [
        {
          label: 'Тековни цени',
          url: '/ekonomski-smetki/tekovni-ceni'
        }
      ]
    }
  ];

  const start = <Link to="/" className="text-xl font-bold mr-8">МакСтат</Link>;

  return (
    <Menubar model={items} start={start} className="mb-4" />
  );
};

export default Navbar; 