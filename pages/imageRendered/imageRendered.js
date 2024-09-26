Page({
  onReady() {
    // Example JSON data
    const jsonData = {
      "title": "wondr by BNI",
      "status": "Transaksi berhasil!",
      "amount": "Rp250.000",
      "transaction_date": "29 Jun 2023",
      "transaction_time": "09:34:56 WIB",
      "ref_id": "1234567890123",
      "destination": {
        "label": "Transportasi",
        "service": "KCIC",
        "order_id": "KCIC-AB28390"
      },
      "source": {
        "name": "Putri Nagara",
        "account_type": "Taplus Muda",
        "account_number": "*******111"
      },
      "transaction_details": {
        "nominal": "Rp250.000",
        "admin_fee": "Rp0",
        "total": "Rp250.000"
      },
      "other_details": {
        "order_id": "KCIC-AB28390",
        "product_type": "Tiket Whoosh",
        "customer_name": "Putra Nagara",
        "due_date": "30 Sep 2023",
        "phone_number": "08111382949",
        "booking_code": "TK129482",
        "departure_date": "12 Januari 2024",
        "departure_time": "06:40 WIB"
      }
    };

    // Use my.createSelectorQuery to get the canvas context
    const query = my.createSelectorQuery();
    query.select('#myCanvas')
      .node()
      .exec((res) => {
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');

        // Set canvas size and scaling for high-DPI displays
        const dpr = my.getSystemInfoSync().pixelRatio;
        canvas.width = 750 * dpr;
        canvas.height = 1200 * dpr;
        ctx.scale(dpr, dpr);

        const paddingLeft = 20;
        let currentHeight = 40; // Start height for text drawing

        // Draw the title (wondr by BNI)
        ctx.font = 'bold 24px sans-serif';
        ctx.fillStyle = '#ff6600';
        ctx.fillText(jsonData.title, paddingLeft, currentHeight);
        currentHeight += 40;

        // Draw the transaction status
        ctx.font = 'bold 18px sans-serif';
        ctx.fillStyle = '#000000';
        ctx.fillText(jsonData.status, paddingLeft, currentHeight);
        currentHeight += 30;

        // Draw the amount
        ctx.font = 'bold 32px sans-serif';
        ctx.fillText(jsonData.amount, paddingLeft, currentHeight);
        currentHeight += 50;

        // Draw transaction date, time, and Ref ID
        ctx.font = '14px sans-serif';
        ctx.fillStyle = '#666666';
        ctx.fillText(`${jsonData.transaction_date} ${jsonData.transaction_time}`, paddingLeft, currentHeight);
        currentHeight += 20;
        ctx.fillText(`Ref ID: ${jsonData.ref_id}`, paddingLeft, currentHeight);
        currentHeight += 30;

        // Section: Tujuan (Destination)
        ctx.font = '16px sans-serif';
        ctx.fillStyle = '#000000';
        ctx.fillText('Tujuan', paddingLeft, currentHeight);
        currentHeight += 20;
        ctx.fillText(`${jsonData.destination.label} • ${jsonData.destination.service}`, paddingLeft, currentHeight);
        currentHeight += 20;
        ctx.fillText(jsonData.destination.order_id, paddingLeft, currentHeight);
        currentHeight += 40;

        // Section: Sumber dana (Source)
        ctx.fillText('Sumber dana', paddingLeft, currentHeight);
        currentHeight += 20;
        ctx.fillText(`${jsonData.source.name}`, paddingLeft, currentHeight);
        currentHeight += 20;
        ctx.fillText(`${jsonData.source.account_type} • ${jsonData.source.account_number}`, paddingLeft, currentHeight);
        currentHeight += 40;

        // Section: Detail transaksi (Transaction details)
        ctx.fillText('Detail transaksi', paddingLeft, currentHeight);
        currentHeight += 20;
        ctx.fillText(`Nominal: ${jsonData.transaction_details.nominal}`, paddingLeft, currentHeight);
        currentHeight += 20;
        ctx.fillText(`Biaya admin: ${jsonData.transaction_details.admin_fee}`, paddingLeft, currentHeight);
        currentHeight += 30;
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText(`Total: ${jsonData.transaction_details.total}`, paddingLeft, currentHeight);
        currentHeight += 40;

        // Section: Detail lainnya (Other details)
        ctx.font = '16px sans-serif';
        ctx.fillText('Detail lainnya', paddingLeft, currentHeight);
        currentHeight += 20;
        ctx.fillText(`Order ID: ${jsonData.other_details.order_id}`, paddingLeft, currentHeight);
        currentHeight += 20;
        ctx.fillText(`Tipe produk: ${jsonData.other_details.product_type}`, paddingLeft, currentHeight);
        currentHeight += 20;
        ctx.fillText(`Nama Pemesan: ${jsonData.other_details.customer_name}`, paddingLeft, currentHeight);
        currentHeight += 20;
        ctx.fillText(`Tanggal Jatuh Tempo: ${jsonData.other_details.due_date}`, paddingLeft, currentHeight);
        currentHeight += 20;
        ctx.fillText(`Nomor HP: ${jsonData.other_details.phone_number}`, paddingLeft, currentHeight);
        currentHeight += 20;
        ctx.fillText(`Kode Booking: ${jsonData.other_details.booking_code}`, paddingLeft, currentHeight);
        currentHeight += 20;
        ctx.fillText(`Tanggal pergi: ${jsonData.other_details.departure_date}`, paddingLeft, currentHeight);
        currentHeight += 20;
        ctx.fillText(`Waktu Pergi: ${jsonData.other_details.departure_time}`, paddingLeft, currentHeight);

        // Render the canvas
        ctx.draw();
      });
  }
});
