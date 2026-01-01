export interface saldoM{
    id?:string,
    nama:string,
    saldo:number,
    return:number
}

export interface tambahsaldoM{
    id:string,
    nama:string,
    topup:number,
    return:number,
    sisa_saldo:number,
}

export interface saldobankBUM{
    id?:string,
    id_pengguna?:string,
    no_pengguna?:number,
    nama_pengguna:string,
    id_lokasi:string,
    nama_lokasi:string,
    saldo:number,
}   