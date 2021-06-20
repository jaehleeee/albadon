import React, { createRef }  from 'react';
import  ExcelJS from 'exceljs';


export const ExcelUploadButton : React.FC = ()=>{
    const inputRef = createRef<HTMLInputElement>();

    const handleFileUploaded = (e: any)=>{
        const workbook = new ExcelJS.Workbook();
        console.log(inputRef.current?.files)
        const files = inputRef.current?.files;
        if(files && files.length > 0){
            console.log(files[0].stream())
           
        }

        
    }
   

    return <input ref={inputRef} type ="file" onChange={handleFileUploaded}/>
       
}

