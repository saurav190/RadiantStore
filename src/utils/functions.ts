export const getDiscount = (price: number, cuttedPrice: number): string => {
    return (((cuttedPrice - price) / cuttedPrice) * 100).toFixed();
}

export const getDeliveryDate = (): string => {
    const deliveryDate = new Date();
    deliveryDate.setDate(new Date().getDate() + 7);
    return deliveryDate.toUTCString().substring(0, 11);
}

export const formatDate = (dt: string | number | Date): string => {
    return new Date(dt).toUTCString().substring(0, 16);
}

export const getRandomProducts = <T>(prodsArray: T[], n: number): T[] => {
    return prodsArray.sort(() => 0.5 - Math.random()).slice(0, n);
}

export const convertFileToBase64 = (file: File | null) => {
    return new Promise<string | null>((resolve, reject) => {
      if (file) {
       
  
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64String = event.target?.result as string;
          resolve(base64String);
        };
        reader.onerror = (event) => {
          console.error('Error reading file:', event.target?.error);
          reject(event.target?.error || new Error('Error reading file'));
        };
        reader.readAsDataURL(file);
      } else {
        resolve(null);
      }
    });
  };
  
