interface GetReactionsCounts {
    [key: string]: {[key: string]: string}
}
export const getReactionsCounts = (args: GetReactionsCounts) => {
    // {like: {bob: true}}
    // [{bob: 34}]
    const final = [];
    for(const key in args){
        const count = Object.keys(args[key]).length
        const res = {unicode: key, count}
        final.push(res);
    }
    return final;
}