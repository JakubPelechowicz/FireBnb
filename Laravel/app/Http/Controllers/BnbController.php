<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateBnbRequest;
use App\Http\Requests\ListBnbRequest;
use App\Http\Requests\UpdateBnbRequest;
use App\Models\Bnb;
use Illuminate\Http\Request;

class BnbController extends Controller
{
    public function create(CreateBnbRequest $request)
    {
        $bnb = Bnb::create(['user_id'=>auth()->user()->id]+$request->validated());
        return response()->json($bnb,201);
    }
    public function index(string $id)
    {
        $bnb = Bnb::find($id);
        if($bnb==null)
            return response()->json(['Not Found'],404);
        return response()->json($bnb,200);
    }
    public function list(ListBnbRequest $request)
    {
        //$request=$request->validated();
        $query = Bnb::query();

        if($request->has('min_cost'))
            $query->where('cost', '>=',$request->min_cost);
        if($request->has('user_id'))
            $query->where('user_id', '=',$request->user_id);
        if($request->has('max_cost'))
            $query->where('cost', '<=',$request->max_cost);
        if($request->has('address_like'))
            $query->where('address', 'ilike','%' . $request->address_like . '%');
        if($request->has('max_space'))
            $query->where('space', '<=',$request->max_space);
        if($request->has('min_space'))
            $query->where('space', '>=',$request->min_space);

        $bnbs= $query->get();
        return response()->json($bnbs,200);
    }
    public function update(UpdateBnbRequest $request)
    {
        $bnb=Bnb::find($request->validated('id'));
        if ($bnb==null)
            return response()->json(['Not Found'],404);
        if($bnb->user_id!=auth()->user()->id)
            return response()->json(['Not authorized'],403);
        $bnb->fill($request->validated());
        $bnb->save();
        return response()->json($bnb,200);
    }
    public function delete(string $id)
    {
        if(auth()->user()==null)
            return response()->json(['Not Authorized'],403);
        $bnb=Bnb::find($id);
        if($bnb->user_id!=auth()->user()->id)
            return response()->json(['Not Authorized'],403);
        if($bnb==null)
            return response()->json(['Not Found'],404);
        $bnb->reservations()->delete();
        $bnb->delete();
        return response()->json($bnb,200);
    }
}
