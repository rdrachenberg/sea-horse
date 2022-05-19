import React, {useEffect, useState} from 'react';
import {useMoralisWeb3Api} from "react-moralis";

const Cards = () => {
    const [count, setCount] = useState(0);
    const [nftObject, setnftObject] = useState({});
    const [nftArray, setNftArray] = useState([]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const Web3Api = useMoralisWeb3Api();

    const getNFTs = async () => {
        let NFTs = await Web3Api.Web3API.account.getNFTs({
            chain: "ropsten",
          });

        let total = NFTs.result.length;
        setCount(total);

        let setArrayWObject = NFTs.result;
        setNftArray(setArrayWObject);

        setnftObject(NFTs);
        //   console.log(nftObject)
        //   console.log(nftArray);
        // console.log(NFTs)
    }

    useEffect(() => {
        getNFTs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
        
    // useEffect(() => {
    //     if(isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading){
    //         enableWeb3();
            
    //     };

    // }, [isAuthenticated, isWeb3Enabled, enableWeb3, isWeb3EnableLoading])


    return(
        <div>
            <h5>Your total NFT count is {count}</h5>
            {nftObject? 
                <div className='card-row'>
                {nftArray.map((items) => {
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

export default Cards

/**
 * 
 * NFT RETURN OBJECT
 * 
 * {
    "total": 3,
    "page": 0,
    "page_size": 500,
    "cursor": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3aGVyZSI6eyJvd25lcl9vZiI6IjB4MzY3MzZmNzIzMWU1NTE4MmUwOWJlNmZkMTRhYmRiNTI4YmFmZjZiNSJ9LCJsaW1pdCI6NTAwLCJvZmZzZXQiOjAsIm9yZGVyIjpbWyJ0cmFuc2Zlcl9pbmRleCIsIkRFU0MiXV0sInBhZ2UiOjEsImtleSI6IjEyMjc0ODA5LjIxLjEuMCIsInRvdGFsIjozLCJpYXQiOjE2NTI4Mzc3MjN9.oDrBqXpBCNuXd-K0ZHIc2y6pcoDgGwA8JhzeMbwPH6E",
    "result": [
        {
            "token_address": "0x2995EdF91516499909a5b2565F95F3CD7F8e5Beb",
            "token_id": "2",
            "amount": "1",
            "owner_of": "0x36736f7231E55182e09be6fd14ABdB528BAFF6B5",
            "token_hash": "f4dd9b4c704a2ca7532009e3aa578167",
            "block_number_minted": "12274864",
            "block_number": "12274864",
            "contract_type": "ERC721",
            "name": "RyanNFT",
            "symbol": "RNFT",
            "token_uri": "https://ipfs.moralis.io:2053/ipfs/QmTuzRVd3Q5jF3TDVT5XZFkhABn8cpLGM1kEM3ShE6cFsr",
            "metadata": "{\"name\":\"Ryan\",\"description\":\"This is awesome!\",\"image\":\"https://gateway.moralisipfs.com/ipfs/QmUG3oGnFsMT3kGdQwyHGG2EZcUbQfFYnjA8arKKq4QwGs\"}",
            "synced_at": "2022-05-18T01:32:47.756Z",
            "last_token_uri_sync": null,
            "last_metadata_sync": null
        },
        {
            "token_address": "0x2995EdF91516499909a5b2565F95F3CD7F8e5Beb",
            "token_id": "1",
            "amount": "1",
            "owner_of": "0x36736f7231E55182e09be6fd14ABdB528BAFF6B5",
            "token_hash": "4ccd40b2300b3981b6a8a4f3ca1bad96",
            "block_number_minted": "12274816",
            "block_number": "12274816",
            "contract_type": "ERC721",
            "name": "RyanNFT",
            "symbol": "RNFT",
            "token_uri": "https://ipfs.moralis.io:2053/ipfs/QmXT4uEwpe6NueKDf8NNUxNTwerF9nPymRVn8StLHc2ffd",
            "metadata": "{\"name\":\"ryan\",\"description\":\"terminator100\",\"image\":\"https://gateway.moralisipfs.com/ipfs/QmUG3oGnFsMT3kGdQwyHGG2EZcUbQfFYnjA8arKKq4QwGs\"}",
            "synced_at": "2022-05-18T01:32:47.756Z",
            "last_token_uri_sync": null,
            "last_metadata_sync": null
        },
        {
            "token_address": "0x2995EdF91516499909a5b2565F95F3CD7F8e5Beb",
            "token_id": "0",
            "amount": "1",
            "owner_of": "0x36736f7231E55182e09be6fd14ABdB528BAFF6B5",
            "token_hash": "68a2c0e5a8a6d7d1e57297c5cab094dd",
            "block_number_minted": "12274809",
            "block_number": "12274809",
            "contract_type": "ERC721",
            "name": "RyanNFT",
            "symbol": "RNFT",
            "token_uri": "https://ipfs.moralis.io:2053/ipfs/QmXT4uEwpe6NueKDf8NNUxNTwerF9nPymRVn8StLHc2ffd",
            "metadata": "{\"name\":\"ryan\",\"description\":\"terminator100\",\"image\":\"https://gateway.moralisipfs.com/ipfs/QmUG3oGnFsMT3kGdQwyHGG2EZcUbQfFYnjA8arKKq4QwGs\"}",
            "synced_at": "2022-05-18T01:32:47.756Z",
            "last_token_uri_sync": null,
            "last_metadata_sync": null
        }
    ],
    "status": "SYNCED"
}
 */