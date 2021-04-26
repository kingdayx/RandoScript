const axios = require('axios');
const os = require('os');
const fs = require('fs');

const array = fs.readFileSync('pairs.txt', { encoding: 'utf8' }).toString().split(os.EOL)
const main = async (arr) =>{
    const arr1 =  array.map( async (str)  =>  {
        try{ const result = await axios.post(
            "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
            {
                query:`
                {
                    pair(id: "${str}"){
                        token0 {
                          id
                          symbol
                          name
                          derivedETH
                        }
                        token1 {
                          id
                          symbol
                          name
                          derivedETH
                        }
                        volumeUSD
                   
                    }
                   }`
            }
        );
        console.log(result.data.data.pair);
    }catch(error){
        console.log(error);
    }
    })


}

main(array)