export interface Event {
  name: string,
  eventType: string,
  startingCampus: string | null,
  location: string | null,
  date: any,
  startingTime: string,
  endingTime: string,
  description: string | null,
}