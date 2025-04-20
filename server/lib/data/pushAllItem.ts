export const pushAllItem = (buffer:string[],messages:string[]) => {
    buffer.push(...messages);
    return buffer;  
}