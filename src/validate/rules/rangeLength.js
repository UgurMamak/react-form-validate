export const rangeLength=(value,param)=>{
    var length = value.length;

    return ( length >= param[ 0 ] && length <= param[ 1 ] );
}