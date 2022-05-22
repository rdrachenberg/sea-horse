import React, {useEffect, useRef, useState} from 'react';
import {useParams, useLocation, useMemo} from 'react-router-dom';
import { useWeb3Transfer } from 'react-moralis';



const Transfer = (props) => {
    const receiver = useRef();
    const params = useLocation();
    const [tokenID, setTokenID] = useState('');
    const [nftName, setNftName] = useState('');
    const [nftDescription, setNftDescription]= useState('')
    // const {token_id} = useParams();
    // const {description} = useParams();
    // console.log(searchParams.match.params);
    // name.get('name');
    // searchParams.get('token_id');
    // searchParams.get('description');
    const searchParams = new URLSearchParams(params.search)
    
    const getID = () => {
        for(const p of searchParams) {
            // setTokenID(p[1])
            if(p[0] === 'token_id'){
                let tokenNumber = Number(p[1]);
                setTokenID(tokenNumber)
                console.log(tokenNumber)
                
            }

            if(p[0] === 'name'){
                let tokenName = p[1];
                setNftName(tokenName)
                console.log(tokenName)
                
            }
            if(p[0] === 'description'){
                let tokenDescription = p[1];
                setNftDescription(tokenDescription)
                console.log(tokenDescription)
                
            }
            
            // console.log(p);
        }
        
    }
    
    
    // console.log(params.name);
    // console.log(params.token_id);
    // console.log(params.description);

    const {fetch, error, isFetching} = useWeb3Transfer({
        type:'erc721',
        receiver: receiver, // need to get this from input 
        contractAddress: process.env.REACT_APP_CONTRACT_ADDRESS,
        tokenId: tokenID// need to get this as a int
    })

    useEffect(() => {
        // console.log(props)
        getID();
    }, [tokenID, nftName, nftDescription])
    return (
        <div>
            <h2>Transfer your NFT</h2>
            <form className='col col-md-6 transfer'>
                <input className='form-control' type='text' placeholder='receivers address. Who are you sending your NFT to?' ref={receiver}/>
            
            </form>
        <div>

        </div>
        </div>
    )
}

export default Transfer