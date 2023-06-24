let o = [{
    aa: "ss",
    aas: [
        {
            asd: "ss"
        },
        {
            asd: "ss"
        },
    ]
},
{
    aa: "ss",
    aas: [
        {
            asd: "ss"
        },
        {
            asd: "ss"
        },
    ]
}
]

o = o.map(e => {
    let v = e;
    v.ss = "ss"
    v.s4 = e.aas.map(e => e.asd + "sss")
    return v;
})
console.log(o)