const succes =()=>{
    return {
        type:"SUCC",
    };
};
const fail =()=>{
    return {
        type:"FAIL",
    };
};
const monthly=()=>{
    return{
     type:"MONTH"
} ;

};

const yearly=()=>{
    return{
    type:"YEAR"
    } ;
};
export {succes , fail, monthly, yearly};