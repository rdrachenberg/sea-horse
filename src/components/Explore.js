import React, { useEffect, useState } from 'react';
import { useMoralisWeb3Api } from 'react-moralis';



const Explore = () => {
    const Web3Api = useMoralisWeb3Api();
    const [count, setCount] = useState(0);
    const [nftObject, setnftObject] = useState({});
    const [nftArray, setNftArray] = useState([]);
    // 0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE
    const fetchAllTokenIds = async () => {
        const options = {
            address: '0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE',
            chain: 'ropsten'
        }

        const NFTs = await Web3Api.token.getAllTokenIds(options);
        let total = NFTs.result.length;
        console.log(total);
        setCount(total);
        setNftArray([NFTs.result[0]])
        console.log(NFTs.result);
    }

    useEffect(() => {
        fetchAllTokenIds()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <div>
            <h5>Your total NFT count is {count}</h5>
            {nftObject? 
                <div className='card-row'>
                {nftArray.map((items) => {
                    console.log(items)
                    const {metadata, token_id, token_uri} = items
                    const metaData = JSON.parse(metadata)
                    
                    const {name, description, image} = metaData;
                    
                    return (
                        <div className="card" key={token_id} style={{width: '18rem', maxWidth:'18rem', padding: '10px', margin: '10px'}}>
                        
                        <img className="card-img-top" src={image} alt="Card img cap" style={{maxHeight: "300px"}} />
                            <div className="card-body">
                                <h5 className="card-title">{name}</h5>
                                <p className="card-text">{token_id}</p>
                                <p className="card-text">{description}</p>
                                <a href={token_uri} className="btn btn-primary" id='meta-data-button' target='_blank' rel='noreferrer'>See Metadata</a>
                            </div>
                            <br/>
                        </div>
                    )  
                })}
            </div>
            
            : 
            <></>}
            
        </div>
    )
}

export default Explore