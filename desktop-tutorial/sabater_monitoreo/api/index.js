const express = require("express");
const cors = require("cors");
const odbc = require("odbc");
const app = express();
app.use(cors());
app.use(express.json());

let today;
app.post("/date", (req, res) => {
	const inputData = req.body.inputDate;

	if (!inputData) {
		// Manejo del caso en que inputDate no esté presente en la solicitud
		return res.status(400).json({ error: "inputDate es requerido" });
	}
	today = inputData;
	// Hacer algo con inputData
	console.log("Fecha recibida:", inputData);

	// Enviar una respuesta
	res
		.status(200)
		.json({ message: "Fecha recibida correctamente", date: inputData });
});

const connectionString = `DRIVER={SQL Server};SERVER=${process.env.SQL_SERVER_HOST || "YOUR_SERVER_HOST"};DATABASE=${process.env.SQL_SERVER_DB || "YOUR_DATABASE_NAME"};UID=${process.env.SQL_SERVER_USER || "YOUR_USER"};PWD=${process.env.SQL_SERVER_PASSWORD || "YOUR_PASSWORD"}`;

function getTodayString() {
	if (today) {
		return today;
	} else {
		return new Date()
			.toISOString()
			.split("T")[0]
			.split("-")
			.reverse()
			.join("/");
	}
}

function connectAndExecuteQuery(query, vista = null) {
	return new Promise((resolve, reject) => {
		odbc.connect(connectionString, (error, connection) => {
			if (error) {
				console.error("Error connecting to database:", error);
				res.status(500).send("Error connecting to database");
				return reject(error);
			}

			connection.query(query, (error, result) => {
				connection.close();
				if (error) {
					console.error("Error executing query:", error);
					return reject(error);
				}
				resolve(result);
			});
		});
	});
}
app.get("/pending", (req, res) => {
	const query = "SELECT * FROM Disparadores WHERE Estado=1";
	connectAndExecuteQuery(query)
		.then((result) => res.json(result))
		.catch((error) => {
			console.error("Error:", error);
			res.status(500).send("Error executing query");
		});
});

app.get("/error", (req, res) => {
	const today = getTodayString();
	const query = `SELECT * FROM Disparadores WHERE Estado=3 AND FecModif >= '${today} 00:00:00' AND FecModif < '${today} 23:59:59'`;
	connectAndExecuteQuery(query)
		.then((result) => res.json(result))
		.catch((error) => {
			console.error("Error:", error);
			res.status(500).send("Error executing query");
		});
});

app.get("/procesed", (req, res) => {
	const today = getTodayString();
	const query = `SELECT D.*, CC.prioridad
  FROM Disparadores D
  INNER JOIN CamposClave CC ON D.Vista = CC.Vista
  WHERE D.FecModif >= '${today} 00:00:00' AND D.FecModif < '${today} 23:59:59'`;
	connectAndExecuteQuery(query)
		.then((result) => res.json(result))
		.catch((error) => {
			console.error("Error:", error);
			res.status(500).send("Error executing query");
		});
});

app.get("/joinProducciones", (req, res) => {
	const today = getTodayString();
	const query = `SELECT D.ValoresBusqueda,D.Vista, P.CodProdu,P.CodXArti,P.CodXPale,P.LoteProv
    FROM Disparadores D
    INNER JOIN Producciones P
    ON D.ValoresBusqueda = CAST (P.CodProdu AS varchar)
    WHERE D.FecModif >= '${today} 00:00:00' AND D.FecModif < '${today} 23:59:59' AND D.Vista='Producciones';`;
	connectAndExecuteQuery(query)
		.then((result) => res.json(result))
		.catch((error) => {
			console.error("Error:", error);
			res.status(500).send("Error executing query");
		});
});

app.get("/joinOrdenesSecuenciadas", (req, res) => {
	const today = getTodayString();
	const query = `SELECT D.ValoresBusqueda,D.Vista, P.CodOrfa,P.T010codemp,P.T424lote,P.T423ano,P.T311codalm,P.T424numlin
  FROM Disparadores D JOIN OrdenesSecuenciadas P
  ON D.ValoresBusqueda COLLATE Latin1_General_CI_AI = P.CodOrfa COLLATE Latin1_General_CI_AI
  WHERE D.FecModif >= '${today} 00:00:00' AND D.FecModif < '${today} 23:59:59'`;
	connectAndExecuteQuery(query)
		.then((result) => res.json(result))
		.catch((error) => {
			console.error("Error:", error);
			res.status(500).send("Error executing query");
		});
});

app.get("/joinAlbaranCompra", (req, res) => {
	const today = getTodayString();
	const query = `SELECT D.ValoresBusqueda, D.Vista, P.CodXRece,P.CodXArti,P.CodXPale,P.LoteProv
    FROM Disparadores D 
    JOIN AlbaranCompra P ON D.ValoresBusqueda COLLATE Latin1_General_CI_AI = P.CodxRece COLLATE Latin1_General_CI_AI
    WHERE D.FecModif >= '${today} 00:00:00' AND D.FecModif < '${today} 23:59:59' AND D.Vista = 'AlbaranCompra'`;
	connectAndExecuteQuery(query)
		.then((result) => res.json(result))
		.catch((error) => {
			console.error("Error:", error);
			res.status(500).send("Error executing query");
		});
});

app.get("/joinAlbaranTraspaso", (req, res) => {
	const today = getTodayString();
	const query = `SELECT D.ValoresBusqueda, D.Vista,P.CodAlbar,P.CodXArti,P.CodXPale,P.LoteProv
    FROM Disparadores D
    JOIN AlbaranTraspaso P ON D.ValoresBusqueda = P.CodAlbar
    WHERE D.FecModif >= '${today} 00:00:00' AND D.FecModif < '${today} 23:59:59' AND D.Vista = 'AlbaranTraspaso'`;
	connectAndExecuteQuery(query)
		.then((result) => res.json(result))
		.catch((error) => {
			console.error("Error:", error);
			res.status(500).send("Error executing query");
		});
});

app.get("/joinCambioEstadoOF", (req, res) => {
	const today = getTodayString();
	const query = `SELECT D.ValoresBusqueda, D.Vista, P.CodSec,P.CodOrfab,P.CodSecue,P.EstSecue
    FROM Disparadores D 
    JOIN CambioEstadoOF P ON D.ValoresBusqueda COLLATE Latin1_General_CI_AI = CodSec COLLATE Latin1_General_CI_AI
    WHERE D.FecModif >= '${today} 00:00:00' AND D.FecModif < '${today} 23:59:59'`;
	connectAndExecuteQuery(query)
		.then((result) => res.json(result))
		.catch((error) => {
			console.error("Error:", error);
			res.status(500).send("Error executing query");
		});
});

app.get("/joinConsumos", (req, res) => {
	const today = getTodayString();
	const query = `SELECT D.ValoresBusqueda, D.Vista ,P.CodConsu,P.CodXArti,P.CodXPale,P.Lote,P.CodMaqui,P.NumeroOF
    FROM Disparadores D 
    JOIN Consumos P ON D.ValoresBusqueda = P.CodConsu
    WHERE D.FecModif >= '${today} 00:00:00' AND D.FecModif < '${today} 23:59:59' AND D.Vista = 'Consumos'`;
	connectAndExecuteQuery(query)
		.then((result) => res.json(result))
		.catch((error) => {
			console.error("Error:", error);
			res.status(500).send("Error executing query");
		});
});

// ordenes formula no va
app.get("/joinOrdenesFormula", (req, res) => {
	const today = getTodayString();
	const query = `SELECT D.ValoresBusqueda, D.Vista, P.Lote
    FROM Disparadores D
    JOIN OrdenesFormula P ON D.ValoresBusqueda collate Latin1_General_CI_AI = CAST((P.T010codemp + P.T423ano + P.T311codalm + P.T423numero + P.T424numlin) AS VARCHAR) +';'+ P.Lote
    WHERE D.FecModif >= '${today} 00:00:00' AND D.FecModif < '${today} 23:59:59' 
    AND D.Vista = 'OrdenesFormula';`;
	connectAndExecuteQuery(query)
		.then((result) => res.json(result))
		.catch((error) => {
			console.error("Error:", error);
			res.status(500).send("Error executing query");
		});
});

app.get("/joinPaletCompra", (req, res) => {
	const today = getTodayString();
	const query = `SELECT D.ValoresBusqueda, D.Vista, P.CodXPale,P.LoteProv
  FROM Disparadores D
  JOIN PaletCompra P ON D.ValoresBusqueda = P.CodXPale collate Latin1_General_CI_AI
  WHERE D.FecModif >= '${today} 00:00:00' AND D.FecModif < '${today} 23:59:59' 
  AND D.Vista = 'PaletCompra';`;
	connectAndExecuteQuery(query)
		.then((result) => res.json(result))
		.catch((error) => {
			console.error("Error:", error);
			res.status(500).send("Error executing query");
		});
});

//pedidos comra no funciona
app.get("/joinPedidosCompra", (req, res) => {
	const today = getTodayString();
	const query = `SELECT D.ValoresBusqueda, D.Vista,P.T610numero
  FROM Disparadores D
  JOIN PedidosCompra P ON D.ValoresBusqueda = cast ((P.T010codemp + P.T127codmov + P.T610ano + P.T311codalm + P.T610numero )as varchar) 
  WHERE D.FecModif >= '${today} 00:00:00' AND D.FecModif < '${today} 23:59:59';`;
	connectAndExecuteQuery(query)
		.then((result) => res.json(result))
		.catch((error) => {
			console.error("Error:", error);
			res.status(500).send("Error executing query");
		});
});

//no funciona
app.get("/joinPedidosCompraLin", (req, res) => {
	const today = getTodayString();
	const query = `SELECT D.ValoresBusqueda, D.Vista,P.T610numero
  FROM Disparadores D
  JOIN PedidosCompra P ON D.ValoresBusqueda = cast ((P.T010codemp + P.T127codmov + P.T610ano + P.T311codalm + P.T610numero )as varchar) 
  WHERE D.FecModif >= '${today} 00:00:00' AND D.FecModif < '${today} 23:59:59';`;
	connectAndExecuteQuery(query)
		.then((result) => res.json(result))
		.catch((error) => {
			console.error("Error:", error);
			res.status(500).send("Error executing query");
		});
});

app.get("/joinMovimientosRegularizacion", (req, res) => {
	const today = getTodayString();
	const query = `SELECT D.ValoresBusqueda, D.Vista ,P.CodMovim,P.CodXPale,P.CodXArti,P.LoteProv
  FROM Disparadores D 
  JOIN MovimientosRegularizacion P ON D.ValoresBusqueda = P.CodMovim
  WHERE D.FecModif >= '${today} 00:00:00' AND D.FecModif < '${today} 23:59:59' AND D.Vista = 'MovimientosRegularizacion';`;
	connectAndExecuteQuery(query)
		.then((result) => res.json(result))
		.catch((error) => {
			console.error("Error:", error);
			res.status(500).send("Error executing query");
		});
});

app.get("/busquedaProducciones", (req, res) => {
	const today = getTodayString();
	const query = `SELECT P.CodXPale as 'ValoresBusqueda',P.CodProdu as 'CodigoProducto', RS.SSCC as 'RSSSCC', RSAG.SSCC as 'RSSSCCAG',RSUbi.RSNpalet as 'RSUbicaciones', RSMovi.SSCC as 'RSMovimientos'
  FROM [WSSOAP].[dbo].[Producciones] P left join BD01.dbo.RSSSCC RS on P.CodXPale=RS.SSCC left join BD01.dbo.RSSSCCAG RSAG on RS.SSCC=RSAG.SSCC left join BD01.dbo.RSUbicaciones RSUbi on RSUbi.RSNpalet= RSAG.SSCC left join BD01.dbo.RSMovimientos RSMovi on RSUbi.RSNpalet=RSMovi.SSCC
  where P.FecProdu >= '${today} 00:00:00' and P.FecProdu < '${today} 23:59:59'`;
	connectAndExecuteQuery(query)
		.then((result) => res.json(result))
		.catch((error) => {
			console.error("Error:", error);
			res.status(500).send("Error executing query");
		});
});

app.get("/busquedaAlbaranCompra", (req, res) => {
	const today = getTodayString();
	const query = `SELECT P.CodXPale as 'ValoresBusqueda',P.CodProdu as 'CodigoProducto', RS.SSCC as 'RSSSCC', RSAG.SSCC as 'RSSSCCAG',RSUbi.RSNpalet as 'RSUbicaciones', RSMovi.SSCC as 'RSMovimientos'
  FROM [WSSOAP].[dbo].[Producciones] P left join BD01.dbo.RSSSCC RS on P.CodXPale=RS.SSCC left join BD01.dbo.RSSSCCAG RSAG on RS.SSCC=RSAG.SSCC left join BD01.dbo.RSUbicaciones RSUbi on RSUbi.RSNpalet= RSAG.SSCC left join BD01.dbo.RSMovimientos RSMovi on RSUbi.RSNpalet=RSMovi.SSCC
  where P.FecProdu >= '${today} 00:00:00' and P.FecProdu < '${today} 23:59:59'`;
	connectAndExecuteQuery(query)
		.then((result) => res.json(result))
		.catch((error) => {
			console.error("Error:", error);
			res.status(500).send("Error executing query");
		});
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
	console.log(`Servidor escuchando en el puerto ${PORT}`);
});

app.get("/", (req, res) => {
	res.json("hola caracola");
});
