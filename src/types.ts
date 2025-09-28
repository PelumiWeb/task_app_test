export type Task = {
    id: string;
    title: string;
    description?: string;
  };
  
  export type Section = {
    id: string;
    title: string;
    tasks: Task[];
  };
  