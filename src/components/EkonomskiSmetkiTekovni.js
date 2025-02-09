import React, { useState, useEffect } from 'react';
import { API_BASE_URL, ENDPOINTS } from '../config/apiConfig';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { ProgressSpinner } from 'primereact/progressspinner';
import axios from 'axios';

const EkonomskiSmetkiTekovni = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}${ENDPOINTS.EKONOMSKI_SMETKI_TEKOVNI}`,
          {
            query: [],
            response: {
              format: "json"
            }
          }
        );

        const transformedData = response.data.data.map(item => ({
          kategorija: item.key[0],
          godina: item.key[1],
          vrednost: item.values[0]
        })).filter(item => item.godina !== ""); // Filter out empty years

        setData(transformedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-content-center">
        <ProgressSpinner />
      </div>
    );
  }

  return (
    <Card title="Економски сметки во земјоделството по тековни цени">
      <DataTable
        value={data}
        paginator
        rows={10}
        rowsPerPageOptions={[10, 25, 50]}
        sortField="godina"
        sortOrder={-1}
        removableSort
        dataKey="id"
        emptyMessage="Нема достапни податоци"
        className="p-datatable-sm"
      >
        <Column
          field="kategorija"
          header="Категорија"
          sortable
          style={{ width: '40%' }}
        />
        <Column
          field="godina"
          header="Година"
          sortable
          style={{ width: '30%' }}
        />
        <Column
          field="vrednost"
          header="Вредност"
          sortable
          style={{ width: '30%' }}
        />
      </DataTable>
    </Card>
  );
};

export default EkonomskiSmetkiTekovni; 