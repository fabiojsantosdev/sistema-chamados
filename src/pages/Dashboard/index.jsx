import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { Title } from '../../components/Title';
import { AiOutlineDashboard } from "react-icons/ai";
import { FiPlus } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/nova-alt/theme.css';
import firebase from '../../services/firebaseConnection';
import { format } from 'date-fns';
import Modal from '../../components/Modal';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

const listRef = firebase.firestore().collection('chamados').orderBy('created', 'desc');

export function Dashboard() {
  const navigate = useNavigate();
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [lastDocs, setLastDocs] = useState();
  const [showPostModal, setShowPostModal] = useState(false);
  const [detail, setDetail] = useState();

  useEffect(() =>  {

    loadChamados();


  }, []);


  async function loadChamados() {
    await listRef.limit(10000)
    .get()
    .then((snapshot) => {
      updateState(snapshot)
    })
    .catch((err)=>{
      console.log('Erro ao buscar chamados: ', err);
      setLoadingMore(false);
    })

    setLoading(false);

  }


  async function updateState(snapshot) {
    const isCollectionEmpty = snapshot.size === 0;

    if (!isCollectionEmpty) {
      let lista = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          assunto: doc.data().assunto,
          cliente: doc.data().cliente,
          clienteId: doc.data().clienteId,
          created: doc.data().created,
          createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
          statuscode: doc.data().statuscode,
          complemento: doc.data().complemento
        })
      })

      const lastDoc = snapshot.docs[snapshot.docs.length - 1]; //Pegando o ultimo documento buscado

 
      setChamados(chamados => [...chamados, ...lista]);
      
      setLastDocs(lastDoc);

    } else {
      setIsEmpty(true);
    }

    setLoadingMore(false);

  }

  function togglePostModal(rowData){
    setShowPostModal(!showPostModal);
    setDetail(rowData);
    console.log(rowData);
    
  }

  const actionBodyTemplate = (rowData) => {
    return (
        <section>
            <Button  icon="pi pi-search" className="p-button-rounded p-button-info mr-1" onClick={()=> togglePostModal(rowData)} />
            <Button  icon="pi pi-pencil" className="p-button-rounded p-button-warning" onClick={()=> navigate(`/new/${rowData.id}`) } />
        </section>
    );
}
  
  const statusBodyTemplate = (rowData) => {
    return <span className='badge' style={{backgroundColor: rowData.statuscode === 'Aberto' ? '#3583f6' : rowData.statuscode === 'Finalizado' ? '#5cb85c' : '#999'}}>
              {rowData.statuscode}
           </span>;
}  

  if (loading) {
    return (
      <div>
        <Header />

        <div className="content">
          <Title name="Atendimentos">
            <AiOutlineDashboard size={25} />
          </Title>

          <div className="container dashboard">
            <span>Buscando chamados...</span>
          </div>

        </div>
      </div>
    )
  }



  return (
    <div>
      <>
      <Header />
      </>

      <div className="content">
        <Title name="Atendimentos">
          <AiOutlineDashboard size={25} />
        </Title>

        {chamados.length === 0 ? (
          <div className="container dashboard">
            <span>Nenhum chamado registrado...</span>

            <Link to="/new" className="new">
              <FiPlus size={25} color="#FFF" />
              Novo chamado
            </Link>
          </div>
        ) : (
          <>
            <Link to="/new" className="new">
              <FiPlus size={25} color="#FFF" />
              Novo chamado
            </Link>

            <DataTable
                  value={chamados}
                  responsiveLayout='stack'
                  paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                  dataKey='id'
                  paginator
                  emptyMessage='No data found'
                  rows={10}
                  size='small'
                >
                    <Column field="cliente" header="Cliente" sortable filter />
                    <Column field="assunto" header="Assunto"  sortable />
                    <Column header="Status" body={statusBodyTemplate} />
                    <Column field="createdFormated" header="Data" />
                    <Column body={actionBodyTemplate} align={'center'}></Column>
                </DataTable>

          </>
        )}

      </div>

      {showPostModal && (
        <Modal 
          conteudo={detail}
          close={togglePostModal}
        />
      )}

    </div>
  )
}

