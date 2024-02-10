
// [1,2,3,...,50]
// [1,...,48,49,50]

export const generatePaginationNumber = (currentPage:number, totalPages: number) =>{

    //Si el numero total de páginas es 7 o menos
    //vamos a mostrar todas las páginas sin puntos suspensivos

    if( totalPages <=7) {
        return Array.from({length:totalPages}, (_,i)=> i+1)
    }

    //Si la página actual esta entre las primeras tres páginas
    //mostrar las primeras 3, puntos suspensivos y las ultimas 2

    if(currentPage <=3) {
        return [1,2,3,"...", totalPages-1,totalPages]
    }

    //Si la página actual esta entre las últimas 3 páginas
    // mostrar las primeras 2, puntos suspensivos, las últimas 3 páginas
    if( currentPage >= totalPages -2 ) {
        return [1,2,"...", totalPages-2, totalPages-1, totalPages]
    }

    //si la página actual está en otro lugar medio 
    //mostrar la primera pagina, punto suspensivos , la página actual y vecinos

    return [1,"...", currentPage -1 , currentPage, currentPage +1, "...", totalPages]


}