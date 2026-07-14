export interface Edital {
  id: number;
  disciplina: string;
  professor: string;
  curso: string;
  vagas: number;
  dataAbertura: string;
  dataEncerramento: string;
  status: "Aberto" | "Encerrado";
  destaque?: boolean;
}
