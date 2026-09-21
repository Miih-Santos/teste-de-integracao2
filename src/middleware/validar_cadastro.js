import { z } from "zod";
import {Filter} from "bad-words";

const filtroPalavrao = new Filter();
filtroPalavrao.addWords("merda", "porra", "caralho", "puta", "viado", "buceta", "bucetao", "pênis", "fodendo", "fode", "penis", "pau", "viadinho", "cu", "cuzão", "cuzao", "cuzinho", "cuzin", "cacete", "dildo", "meretriz", "fuck", "fucked", "fucking"); 


const doadorSchema = z.object({
    nome: z.string({ required_error: "Nome é obrigatório" })
        .trim()
        .min(3, "O nome deve ter no mínimo 3 caracteres")
        .refine((texto) => !filtroPalavrao.isProfane(texto), { 
            message: "O nome contém palavras inapropriadas" 
        }),
    
    email: z.string({ required_error: "Email é obrigatório" })
        .email("Formato de e-mail inválido")
        .trim()
        .toLowerCase(), 
    
    senha: z.string({ required_error: "Senha é obrigatória" })
        .min(8, "A senha deve ter no mínimo 8 caracteres")
        .regex(/^\S+$/, "A senha não pode conter espaços em branco")
        .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
        .regex(/[0-9]/, "A senha deve conter pelo menos um número")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "A senha deve conter pelo menos um caractere especial"),
    
    dataCadastro: z.string().optional(),
    ativo: z.boolean().optional()
});

const enderecoSchema = z.object({
    rua: z.string().trim().min(3, "Rua inválida"),
    bairro: z.string().trim().min(2, "Bairro inválido"),
    cidade: z.string().trim().min(2, "Cidade inválida"),
    estado: z.string().length(2, "Estado deve conter apenas a sigla (ex: SP)").toUpperCase()
});

const telefoneSchema = z.object({
    ddd: z.string().length(2, "DDD deve ter 2 números"),
    numero: z.string().min(8, "Número muito curto").max(9, "Número muito longo")
});

const cadastroCompletoSchema = z.object({
    doador: doadorSchema,
    endereco: enderecoSchema,
    telefone: telefoneSchema
});

const validarDadosCadastro = (req, res, next) => {
    try {
        const dadosLimpos = cadastroCompletoSchema.parse(req.body);
        req.body = dadosLimpos;
        
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errosFormatados = error.issues.map(err => ({ 
                campo: err.path.join('.'),
                mensagem: err.message
            }));

         
            return res.status(400).json({ 
                erro: "Dados de cadastro inválidos", 
                detalhes: errosFormatados 
            });
        }
    
        console.error("Erro interno no middleware de validação:", error);
        return res.status(500).json({ erro: "Erro interno no servidor durante a validação." });
    }
    
    next(); 
};

export { validarDadosCadastro };