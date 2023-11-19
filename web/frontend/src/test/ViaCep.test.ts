import ViaCepGateway from "src/gateway/ViaCepGateway";
import { test } from "vitest";

test("Deve retornar um endereco", async () => {
   const viaCep = new ViaCepGateway()
   console.log(await viaCep.getAdress('76964-496'))
})