"use client";

import { Order, User } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import {
  MdAccessTimeFilled,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import moment from "moment";
import { log } from "console";
import { products } from "@/utils/products";
import { data } from "autoprefixer";

interface ManageOrdersClientProps {
  orders: ExtendedOrder[];
}

type ExtendedOrder = Order & {
  user: User;
};

const ManageOrdersClient: React.FC<ManageOrdersClientProps> = ({ orders }) => {
  const router = useRouter();
  let rows: any = [];

  if (orders) {
    rows = orders.map((order) => {
      return {
        id: order.id,
        customer: order.user.name,
        amount: formatPrice(order.amount / 100),
        paymentStatus: order.status,
        date: moment(order.createDate).fromNow(),
        deliveryStatus: order.deliveryStatus,
        products: order.products,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "customer", headerName: "Nama Pelanggan", width: 130 },
    {
      field: "amount",
      headerName: "Jumlah(Rp)",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.amount}</div>
        );
      },
    },
    {
      field: "paymentStatus",
      headerName: "Pembayaran",
      width: 130,
      renderCell: (params) => {
        return (
          <div>
            {params.row.paymentStatus === "pending" ? (
              <Status
                text="tertunda"
                icon={MdAccessTimeFilled}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : params.row.paymentStatus === "complete" ? (
              <Status
                text="sudah"
                icon={MdDone}
                bg="bg-green-200"
                color="text-green-700"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: "deliveryStatus",
      headerName: "Status Pengiriman",
      width: 130,
      renderCell: (params) => {
        return (
          <div>
            {params.row.deliveryStatus === "pending" ? (
              <Status
                text="tertunda"
                icon={MdAccessTimeFilled}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : params.row.deliveryStatus === "dispatched" ? (
              <Status
                text="pesanan dikirim"
                icon={MdDeliveryDining}
                bg="bg-purple-200"
                color="text-purple-700"
              />
            ) : params.row.deliveryStatus === "delivered" ? (
              <Status
                text="pesanan terkirim"
                icon={MdDone}
                bg="bg-green-200"
                color="text-green-700"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: "date",
      headerName: "Waktu",
      width: 130,
    },
    {
      field: "action",
      headerName: "Aksi",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full">
            <ActionBtn
              icon={MdDeliveryDining}
              onClick={() => {
                handleDispatch(params.row.id);
              }}
            />
            <ActionBtn
              icon={MdDone}
              onClick={() => {
                handleDeliver(params.row.id, params.row.products[0].id, params.row.products[0].quantity);
              }}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/order/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  const handleDispatch = useCallback((id: string) => {
    axios
      .put("/api/order", {
        id,
        deliveryStatus: "dispatched",
      })
      .then((res) => {
        toast.success("Pesanan Dikirim");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Oops! Something went wrong");
        console.log(err);
      });
  }, []);






  const handleDeliver = useCallback(async (id: string, idProduct: String, qty: string) => {
    const productsData = await axios.get(`/api/product/`);
    const products = productsData.data;
    const product = products.find((product: any) => product.id === idProduct);
    const stok = product.qty;
    console.log("dataaaaa stok : ", stok);

    axios
      .put("/api/order", {
        id,
        deliveryStatus: "delivered",
      })
      .then((res) => {
        toast.success("Pesanan Terkirim");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Oops! gagal");
        console.log(err);
      });

    const qtyNumber = parseInt(qty, 10); // Mengonversi qty dari string ke number
    const newQty = stok - qtyNumber;

    axios.put("/api/product", {
      id: idProduct,
      qty: newQty
    })
      .then((res) => {
        toast.success("Status produk berubah");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Oops! ada sesuatu masalah");
        console.log(err);
      });
  }, []);



  return (

    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Kelola Orderan" center />
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 9 },
            },
          }}
          pageSizeOptions={[9, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default ManageOrdersClient;
