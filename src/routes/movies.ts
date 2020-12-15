import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type PrismaMovie = {
  id: number | string,
  uuid: string,
  title: string,
  year: number,
  director: string,
  stars: string,
  createdAt: Date,
  lastUpdated: Date,
}

type JSONAPIRecord = {
  id: string | number,
  type: string,
  attributes: { [key: string]: any }
}

const formatJSONAPI = (record: PrismaMovie) : JSONAPIRecord => {
  return {
    id: record.uuid,
    type: 'movie',
    attributes: {
      title: record.title,
      year: record.year,
      director: record.director,
      stars: record.stars,
      createdAt: record.createdAt,
      lastUpdated: record.lastUpdated,
    }
  }
}

const formatJSON = (record: PrismaMovie): any => {
  return {
    id: record.uuid,
    title: record.title,
    year: record.year,
    director: record.director,
    stars: record.stars,
    createdAt: record.createdAt,
    lastUpdated: record.lastUpdated,

  }
}

export const getMovies = async (req: Request, res: Response) => {
  const movies = await prisma.movie.findMany();

  const isJSONAPI = req.headers['accept'] === 'application/vnd.api+json';

  res.send({
    data: isJSONAPI ? movies.map(r => formatJSONAPI(r)) : movies.map(r => formatJSON(r)),
  })
}

export const getMovieByUUID = async (req: Request, res: Response) => {
  const { uuid } = req.params;
  const isJSONAPI = req.headers['accept'] === 'application/vnd.api+json';

  const movie = await prisma.movie.findUnique({
    where: {
      uuid,
    }
  });

  if (!movie) {
    return {
      data: null,
    }
  }

  res.send({
    data: isJSONAPI ? formatJSONAPI(movie) : formatJSON(movie),
  });
}

export const createMovie = async (req: Request, res: Response) => {
  const body = req.body;

  const r = await prisma.movie.create({
    data: {
      title: body.title || '',
      year: body.year || null,
      director: body.director || '',
      stars: body.stars || '',
    },
  })

  res.send({
    data: r,
  });
}