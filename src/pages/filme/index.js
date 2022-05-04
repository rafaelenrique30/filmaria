import { useEffect, useState } from 'react';
import './filme-info.css';
import {useParams, useHistory} from 'react-router-dom';
import api from '../../services/api';
import {toast} from 'react-toastify';

export default function Filme(){
    const {id} = useParams();

    const history = useHistory();

    const[filme, setFilme] = useState([]);

    const[loading, setLoading] = useState(true);


    useEffect(() => {
        async function loadFilme(){
            const response = await api.get(`r-api/?api=filmes/${id}`);

            if(response.data.length === 0){
                history.replace('/');
                return;
            }

            //console.log(response.data);
            setFilme(response.data);
            setLoading(false);
        }
        loadFilme();

        return () => {
            console.log('componente desmontado');
        }
    }, [history, id]);


    function salvaFilme (){
        
        const minhaLista = localStorage.getItem('filmes');

        let filmesSalvos = JSON.parse(minhaLista) || [];

        //Se tiver algum filme salvo com o mesmo id precisa ignorar

        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)
        //Some retorna um valor booleano

        if(hasFilme){
            toast.info('Você já possui esse filme salvo.');
            //alert('Você já possui esse filme salvo.');
            return;
            //Para a execução do código aqui...
        }

        filmesSalvos.push(filme);

        localStorage.setItem('filmes', JSON.stringify(filmesSalvos));

        //alert('Filme salvo com sucesso!!');
        toast.success('Filme salvo com sucesso!!');
    }

    if(loading){

        return(
            <div className='filme-info'>
                <h1>Carregando seu filme...</h1>
            </div>
        )
            

    }else{
        return(
            <div className='filme-info'>
                <h1>{filme.nome}</h1>
                <img src={filme.foto} alt={filme.nome}/>
                <h3>Sinopse</h3>
                {filme.sinopse}

                <div>
                    <button onClick={salvaFilme}> Salvar</button>
                    <button>
                        <a target="blank" href={`https://youtube.com/results?search_query=${filme.nome} Trailer`}>
                            Trailer
                        </a>
                    </button>
                </div>
            </div>
        )
    }
}