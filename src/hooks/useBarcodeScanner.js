import { useEffect } from "react";
import { useSymbologyScanner } from '@use-symbology-scanner/react';

const useBarcodeScanner = (barcodeRefs, handleBarcodeScanned) => {
  useEffect(() => {
    const setupBarcodeScanner = (index) => {
      const handleSymbol = (symbol) => {
        handleBarcodeScanned(symbol, index);
      };
      

      if (barcodeRefs.current[index]) {
        return useSymbologyScanner(handleSymbol, {
          target: barcodeRefs.current[index]
        });
      }
    };

    // Setup scanners for each barcode input
    barcodeRefs.current.forEach((_, index) => {
      setupBarcodeScanner(index);
    });
  }, [barcodeRefs, handleBarcodeScanned]);
};

export default useBarcodeScanner;
