import React, { useEffect, useState } from 'react';
import { useMoralisWeb3Api } from 'react-moralis';



const Explore = () => {
    const Web3Api = useMoralisWeb3Api();
    const [count, setCount] = useState(0);
    const [nftObject, setnftObject] = useState({});
    const [nftArray, setNftArray] = useState([]);
    const [artist, setArtist] = useState('');
    //* 0xE93C817Ed22EA606B2a948C1536013013F34DBB9 !!!!!!!!!!!!GOOD!!!!!!!!!!!!!
    //* 0x2995EdF91516499909a5b2565F95F3CD7F8e5Beb !!!!!!!!!! MINE !!!!!!!!!!!!!!
    //* 0xa7a26b29d4530Ac7EAAFd8238474979508eE2D27 !!!!!!!!!! GOOD Rate limit 6 !!!!!!!!!
    const fetchAllTokenIds = async (passedContract) => {
        console.log('this is the artist coming in here \n' , artist)
        setArtist(passedContract);
        await artist
        
        const options = {
            address: artist,
            chain: 'ropsten',
            limit: 6
        }

        

        const NFTs = await Web3Api.token.getAllTokenIds(options);
        let total = NFTs.result.length;
        
        setCount(total);
        // console.log(total);

        setNftArray([...NFTs.result])
        // console.log(NFTs.result);

        setnftObject(NFTs)
        // console.log(nftObject)
    }

    const handleSelectOption = async (e) => {
        
        console.log(e.target.value);
        await e.target.value;
        setArtist(e.target.value);
        fetchAllTokenIds(e.target.value);
    }

    // useEffect(()=> {
    //     console.log('this is from useEffect artist: ', artist)
    // }, [artist])

    useEffect(() => {
        fetchAllTokenIds('0xE93C817Ed22EA606B2a948C1536013013F34DBB9')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <div className='explore'>
            <h4>Your total NFT count is {count}</h4>
            <h5>Select an artist</h5>
            <div className='select'>
                <select className="form-select" aria-label="Default select" onChange={handleSelectOption}>
                    {/* <option selected>Select Artist</option> */}
                    <option value="0xE93C817Ed22EA606B2a948C1536013013F34DBB9">Mutant Ape Yacht Club</option>
                    <option value="0x2995EdF91516499909a5b2565F95F3CD7F8e5Beb">Cool Cat</option>
                    <option value="0xa7a26b29d4530Ac7EAAFd8238474979508eE2D27">Hodge Podge</option>
                </select>
            </div>
            {nftObject? 
                <div className='card-row'>
                {nftArray.map((items) => {
                    // eslint-disable-next-line no-lone-blocks
                    {/* console.log(items) */}
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