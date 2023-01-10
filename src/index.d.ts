export interface Meeting {
  order: number;
  endedAt: string;
  startedAt: string;
}

export interface Member {
  name: string;
}

export interface Club {
  club: {
    id: string;
    name: string;
    type: string;
    place: string;
    coverUrl: string;
    meetings: Meeting[];
    description: string;
  };
  price: number;
  leaders: Member[];
  partners: Member[];
  createdAt: string;
}
