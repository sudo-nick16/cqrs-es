const serialize = (obj: any) => {
    return `data: ${JSON.stringify(obj)}\n\n`;
}

export default serialize;