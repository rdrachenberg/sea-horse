import React, {useEffect, useRef, useState} from 'react';
import { useLocation} from 'react-router-dom';
import { useMoralis } from 'react-moralis';
import Moralis from 'moralis';



const Transfer = (props) => {
    const { enableWeb3, isAuthenticated} =useMoralis();

    const receiver = useRef();
    const params = useLocation();

    const [tokenID, setTokenID] = useState('');
    const [nftName, setNftName] = useState('');

    const [nftDescription, setNftDescription]= useState('')
    const [nftImage, setNftImage]= useState('')

    const [successfulTransaction, setSuccessfullTransaction] = useState(false);
    const [toggleSuccess, setToggleSuccess] = useState(false);

    const [transactionHash, setTransactionHash] = useState('');
    const [to, setTo] = useState('');

    const [index, setIndex] = useState('');
    const [confirmations, setConfirmations] = useState('');
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

            if(p[0] === 'image'){
                let tokenImage = p[1];
                setNftImage(tokenImage)
                console.log(tokenImage)
            }
            // console.log(p);
        }
        
    }
    
    
    // console.log(params.name);
    // console.log(params.token_id);
    // console.log(params.description);

    

    // const {fetch, error, isFetching} = useWeb3Transfer()
    

    useEffect(() => {
        // console.log(props)
        getID();
        if(isAuthenticated){
            enableWeb3();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenID, nftName, nftDescription])
    
    
    
    const handleTransferClick = async (e) => {
        e.preventDefault();
        
        const options = {
            type:'erc721',
            receiver: receiver.current.value, // need to get this from input 
            contractAddress: process.env.REACT_APP_CONTRACT_ADDRESS,
            tokenId: tokenID// need to get this as a int
        }
        // console.log(receiver.current.vaule);
        console.log('transfer button has been clicked');
        // console.log(options)
        let transaction = await Moralis.transfer(options);
        let result = await transaction.wait();

        if(result) {
            console.log(result);
            setSuccessfullTransaction(true);
            setToggleSuccess(true)
            setTransactionHash(result.transactionHash)
            setTo(result.to);
            setIndex(result.transactionIndex)
            setConfirmations(result.confirmations)
        }
        // fetch(options).then((res) => {console.log(res)})
    }


    return (
        <div>
            {successfulTransaction? 
                <div>
                    {toggleSuccess? 
                        <div className="alert alert-success" role="alert">
                            You have transferred the NFT succesfully
                        </div>
                        : <></>
                    }
                    <div>
                        <h3>Your Transaction Information</h3>
                        <h5>Confirmations: {confirmations}</h5>
                        <h5>The transaction index is:  {index}</h5>
                        <h5>You sent the NFT to: {to}</h5>
                        <h5>Transaction hash: <a href={'https://ropsten.etherscan.io/tx/'+transactionHash} target='_blank' rel='noreferrer'>{transactionHash}</a></h5>
                        
                        <div className='card' style={{width: '18rem', maxWidth:'18rem', padding: '10px', margin: 'auto'}}>
                            <div className='overlay'>
                            <h2 id='sold'>Sold</h2>
                                <img id='sold-img' className='card-img-top' src={nftImage} alt='nft file img' />
                                
                            </div>
                            <div className='card-body'>
                                <h5>{nftName}</h5>
                                <p>Description: {nftDescription}</p>
                                <p>NFT id: {tokenID}</p>
                            </div>
                        </div>
                    </div>
                </div>
            : 
                <div>
                    <h2>Transfer your NFT</h2>
                    <div className='card' style={{width: '18rem', maxWidth:'18rem', padding: '10px', margin: 'auto'}}>
                        <img className='card-img-top' src={nftImage} alt='nft file img' />
                        <div className='card-body'>
                            <h5>{nftName}</h5>
                            <p>Description: {nftDescription}</p>
                            <p>NFT id: {tokenID}</p>
                        </div>
                        <form className='col col-md-12 transfer'>
                            <input className='form-control' type='text' placeholder='Receivers address?' ref={receiver}/>    
                        </form>
                        <button className='btn glowing' id='mint-button' onClick={handleTransferClick}>Transfer</button>
                    </div>
                </div>
            }
            
        <div>

        </div>
        </div>
    )
}

export default Transfer

/**
 {
    "to": "0x2995EdF91516499909a5b2565F95F3CD7F8e5Beb",
    "from": "0x36736f7231E55182e09be6fd14ABdB528BAFF6B5",
    "contractAddress": null,
    "transactionIndex": 19,
    "gasUsed": {
        "type": "BigNumber",
        "hex": "0xc930"
    },
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000040000000020000000200000000000000000000000000008000000000000000000000002000000008000000000000000020000000000000000000800000000000000000000000010000000000000000000000000010000000000000000000000000000000000000000000004020000000000000000000000000000000000000000000000000000000000000000000002080000000000000000000000000000040000000000040000000220000010000000000000000000000000000000000001000000000000000000000000",
    "blockHash": "0xa81b1c9c4ef1114e7295b08e0e116d0aea18d20860796928ada1aee31fe3227c",
    "transactionHash": "0x6c68fb0ba9f127853a16fc1917aa164277f719ee063c5e372cf186a0004e1cc7",
    "logs": [
        {
            "transactionIndex": 19,
            "blockNumber": 12295354,
            "transactionHash": "0x6c68fb0ba9f127853a16fc1917aa164277f719ee063c5e372cf186a0004e1cc7",
            "address": "0x2995EdF91516499909a5b2565F95F3CD7F8e5Beb",
            "topics": [
                "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
                "0x00000000000000000000000036736f7231e55182e09be6fd14abdb528baff6b5",
                "0x0000000000000000000000000000000000000000000000000000000000000000",
                "0x000000000000000000000000000000000000000000000000000000000000000a"
            ],
            "data": "0x",
            "logIndex": 13,
            "blockHash": "0xa81b1c9c4ef1114e7295b08e0e116d0aea18d20860796928ada1aee31fe3227c"
        },
        {
            "transactionIndex": 19,
            "blockNumber": 12295354,
            "transactionHash": "0x6c68fb0ba9f127853a16fc1917aa164277f719ee063c5e372cf186a0004e1cc7",
            "address": "0x2995EdF91516499909a5b2565F95F3CD7F8e5Beb",
            "topics": [
                "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                "0x00000000000000000000000036736f7231e55182e09be6fd14abdb528baff6b5",
                "0x00000000000000000000000040fc61702a969143591b7faa60ce810ffbb4086c",
                "0x000000000000000000000000000000000000000000000000000000000000000a"
            ],
            "data": "0x",
            "logIndex": 14,
            "blockHash": "0xa81b1c9c4ef1114e7295b08e0e116d0aea18d20860796928ada1aee31fe3227c"
        }
    ],
    "blockNumber": 12295354,
    "confirmations": 2,
    "cumulativeGasUsed": {
        "type": "BigNumber",
        "hex": "0x2d92eb"
    },
    "effectiveGasPrice": {
        "type": "BigNumber",
        "hex": "0x84da9c56"
    },
    "status": 1,
    "type": 2,
    "byzantium": true,
    "events": [
        {
            "transactionIndex": 19,
            "blockNumber": 12295354,
            "transactionHash": "0x6c68fb0ba9f127853a16fc1917aa164277f719ee063c5e372cf186a0004e1cc7",
            "address": "0x2995EdF91516499909a5b2565F95F3CD7F8e5Beb",
            "topics": [
                "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
                "0x00000000000000000000000036736f7231e55182e09be6fd14abdb528baff6b5",
                "0x0000000000000000000000000000000000000000000000000000000000000000",
                "0x000000000000000000000000000000000000000000000000000000000000000a"
            ],
            "data": "0x",
            "logIndex": 13,
            "blockHash": "0xa81b1c9c4ef1114e7295b08e0e116d0aea18d20860796928ada1aee31fe3227c"
        },
        {
            "transactionIndex": 19,
            "blockNumber": 12295354,
            "transactionHash": "0x6c68fb0ba9f127853a16fc1917aa164277f719ee063c5e372cf186a0004e1cc7",
            "address": "0x2995EdF91516499909a5b2565F95F3CD7F8e5Beb",
            "topics": [
                "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                "0x00000000000000000000000036736f7231e55182e09be6fd14abdb528baff6b5",
                "0x00000000000000000000000040fc61702a969143591b7faa60ce810ffbb4086c",
                "0x000000000000000000000000000000000000000000000000000000000000000a"
            ],
            "data": "0x",
            "logIndex": 14,
            "blockHash": "0xa81b1c9c4ef1114e7295b08e0e116d0aea18d20860796928ada1aee31fe3227c"
        }
    ]
}
 */