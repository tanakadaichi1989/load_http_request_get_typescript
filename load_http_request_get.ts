/**
 * @param {string} url API の URL
 * @returns url に対し、HTTP リクエスト（GET) した場合のデータを T 型のデータに変換するもの
 */
async function load<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

/**
 * 郵便番号 API から受け取った JSON データを扱いやすいデータに変換するためのモデル
 */
interface ZipCloudResponse {
  status: number;
  message: string;
  results: {
    zipcode: string;
    prefcode: string;
    address1: string;
    address2: string;
    address3: string;
    kana1: string;
    kana2: string;
    kana3: string;
  }[];
}

class Address {
    address1: string;
    address2: string;
    address3: string;
    
    constructor(address1:string,address2:string,address3:string){
        this.address1 = address1;
        this.address2 = address2;
        this.address3 = address3;
    }

    getInfo():string{
        return this.address1 + this.address2 + this.address3;
    }
}

/**
 * load メソッドを呼び出すメソッド
 * このメソッドを画面に関するコードで呼び出せば良い
 */
async function main(){
    try {
        const result: ZipCloudResponse = await load<ZipCloudResponse>('https://zipcloud.ibsnet.co.jp/api/search?zipcode=7830060');
        result.results.forEach((result) => {
            let address = new Address(result.address1,result.address2,result.address3);
            console.log(address.getInfo());
        })
    } catch(error) {
        console.log(error);
    }
}

main();
